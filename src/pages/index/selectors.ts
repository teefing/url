import { selector } from 'recoil'
import { generateURI } from './utils'
import { URIState } from './atoms'

export const composedURIState = selector({
  key: 'composedURIState',
  get: ({ get }) => {
    const uriObj = get(URIState)
    return generateURI(uriObj)
  },
})
