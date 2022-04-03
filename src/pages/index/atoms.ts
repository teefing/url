import { atom } from 'recoil'
import type { URI } from './types'

export const URIState = atom<URI>({
  key: 'URIState',
  default: {
    protocol: 'https',
    auth: '',
    host: 'www.google.com',
    // host: 'sslocal://webcast_lynxview?type=fullscreen&url=https%3A%2F%2Flf-webcast-sourcecdn-tos.bytegecko.com%2Fobj%2Fbyte-gurd-source%2F10181%2Fgecko%2Fresource%2Fecommerce_buynow_aweme%2Fapp%2Ftemplate.js&enable_font_scale=1&hide_nav_bar=1&status_bar_color=black&status_bar_bg_color=white&web_bg_color=%23ffffff&top_level=1&add_safe_area_height=0&buynow_source_type=7&spell_group_id=7081226875971846408&group_type=1&multi_product_info=%5B%7B%22shop_id%22%3A%22bMLccs%22%2C%22product_requests%22%3A%5B%7B%22product_id%22%3A%223540772072206787612%22%2C%22sku_id%22%3A%221728892613284920%22%2C%22sku_num%22%3A1%2C%22given_product_campaign_id%22%3Anull%2C%22given_product_request_list%22%3Anull%7D%2C%7B%22product_id%22%3A%223538775898084005219%22%2C%22sku_id%22%3A%221727917919062078%22%2C%22sku_num%22%3A1%2C%22given_product_campaign_id%22%3Anull%2C%22given_product_request_list%22%3Anull%7D%5D%7D%5D&ecom_scene_id=1051&enter_from=open_url&author_id=103536761951&mega_object_id=7106dc1a-30f2-4a08-81bf-be87d83ff36f',
    port: '',
    path: '',
    query: '',
    fragment: '',
  },
})

export const QueryState = atom<[string, string][]>({
  key: 'QueryState',
  default: [],
})

export const ChosenQueryState = atom<{
  key: string
  value: string
  index: number
}>({
  key: 'ChosenQueryState',
  default: {
    key: '',
    value: '',
    index: -1,
  },
})
