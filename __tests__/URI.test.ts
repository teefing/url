import { expect, test } from 'vitest'
import { generateURI, parseURI } from '../src/pages/index/utils'

test('generateURI', () => {
  const uriObj = {
    protocol: 'http',
    auth: 'user:pass',
    host: 'example.com',
    port: '8080',
    path: '/path',
    query: 'query=value',
    fragment: 'fragment',
  }
  expect(generateURI(uriObj)).toEqual('http://user:pass@example.com:8080/path?query=value#fragment')
})

test('parseURI', () => {
  const uri = 'http://user:pass@example.com:8080/path?query=value#fragment'
  expect(parseURI(uri)).toEqual({
    protocol: 'http',
    auth: 'user:pass',
    host: 'example.com',
    port: '8080',
    path: '/path',
    query: 'query=value',
    fragment: 'fragment',
  })
})
