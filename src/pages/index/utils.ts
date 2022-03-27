import type { URI } from './types'

const URIREG = /^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/

const AUTH_HOST_PORT_REG = /^(?:([\w:]*)@)?([^:]*)?(?::(.*))?$/

export const parseURI = (uri: string) => {
  let protocol = ''; let auth = ''; let host = ''; let port = ''; let path = ''; let query = ''; let fragment = ''

  let res = uri.match(URIREG)
  if (!res) return null
  protocol = res[1] || ''
  const authority = res[2] || ''
  path = res[3] || ''
  query = res[4] || ''
  fragment = res[5] || ''

  if (authority) {
    res = authority.match(AUTH_HOST_PORT_REG)
    if (res) {
      auth = res[1] || ''
      host = res[2] || ''
      port = res[3] || ''
    }
  }

  return {
    protocol,
    auth,
    host,
    port,
    path,
    query,
    fragment,
  }
}

export const generateURI = (uriObj: URI) => {
  const { protocol, auth, host, port, path, query, fragment } = uriObj

  const protocolStr = protocol ? `${protocol}://` : ''
  const authStr = auth ? `${auth}@` : ''
  const hostStr = host ? `${host}` : ''
  const portStr = port ? `:${port}` : ''
  const pathStr = path ? path.startsWith('/') ? path : `/${path}` : ''
  const queryStr = query ? `?${query}` : ''
  const fragmentStr = fragment ? `#${fragment}` : ''
  return `${protocolStr}${authStr}${hostStr}${portStr}${pathStr}${queryStr}${fragmentStr}`
}
