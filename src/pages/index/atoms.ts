import { atom } from 'recoil'
import type { URI } from './types'

export const URIState = atom<URI>({
  key: 'URIState',
  default: {
    protocol: '',
    auth: '',
    host: '',
    port: '',
    path: '',
    query: '',
    fragment: '',
  },
})
