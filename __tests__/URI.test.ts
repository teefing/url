import { expect, test } from 'vitest'
import { generateURI, parseQuery, parseURI } from '../src/pages/index/utils'

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

test('parseQuery', () => {
  expect(parseQuery('')).toEqual({})
  expect(parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' })
  expect(parseQuery('surl=http%3A%2F%2F11.11.11.11%3A4001%2Fcustom%2Ftemplate.js%3F1628843357329&use_rifle=1&should_full_screen=1&enable_immersion_keyboard_control=0&status_font_dark=1&hide_debug_label=0&thread_strategy=2&revision_ab=4&filter_oncall_entry=1&meta_info=%257B%2522sec_shop_id%2522%253A%2522cBuyGMza%2522%252C%2522tmp_id%2522%253A%25227031842724902977806%2522%257D')).toEqual({
    surl: 'http://11.11.11.11:4001/custom/template.js?1628843357329',
    use_rifle: '1',
    should_full_screen: '1',
    enable_immersion_keyboard_control: '0',
    status_font_dark: '1',
    hide_debug_label: '0',
    thread_strategy: '2',
    revision_ab: '4',
    filter_oncall_entry: '1',
    meta_info: '%7B%22sec_shop_id%22%3A%22cBuyGMza%22%2C%22tmp_id%22%3A%227031842724902977806%22%7D',
  })
})
