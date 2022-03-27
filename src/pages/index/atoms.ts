import { atom } from 'recoil'
import type { URI } from './types'

export const URIState = atom<URI>({
  key: 'URIState',
  default: {
    protocol: 'https',
    auth: '',
    host: 'www.google.com',
    port: '',
    path: '',
    query: '',
    fragment: '',
  },
})
