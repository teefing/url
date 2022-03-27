import { selector } from 'recoil'
import { generateURI, parseQuery } from './utils'
import { URIState } from './atoms'

export const composedURIState = selector({
  key: 'composedURIState',
  get: ({ get }) => {
    const uriObj = get(URIState)
    return generateURI(uriObj)
  },
})

export const queryObjectState = selector({
  key: 'queryObjectState',
  get: ({ get }) => {
    const uriObj = get(URIState)
    const query = uriObj.query
    return parseQuery(query)
  },
})
