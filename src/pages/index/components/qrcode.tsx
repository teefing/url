import { Input } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import type { PropsWithChildren } from 'react'
import { composedURIState } from '../selectors'
import { URIState } from '../atoms'
import { parseURI } from '../utils'
import type { URI } from '../types'

interface IBtn {
  text: string
  onClick?: (...args: any[]) => any
}
const Btn = ({ children, text, onClick = () => undefined }: PropsWithChildren<IBtn>) => {
  return <div onClick={onClick} className="flex items-center justify-center cursor-pointer h-3">
    {children}
    <div className="ml-1 text-white">{text}</div>
  </div>
}

const Qrcode = () => {
  const uriStr = useRecoilValue(composedURIState)
  const setURI = useSetRecoilState(URIState)
  const handleTextareaChange = useCallback((e) => {
    const obj = parseURI(e.target.value) as URI
    setURI(() => obj)
  }, [])

  return <div>
    <QRCodeCanvas
      value={uriStr}
      size={400}
      bgColor="#FFFFFF"
      fgColor="#000000"
      includeMargin
    />

    <Input.TextArea onChange={handleTextareaChange} className="mt-3 rounded" value={uriStr} autoSize={{ minRows: 2, maxRows: 20 }}></Input.TextArea>
    <div>
      <CopyToClipboard text={uriStr}>
        <div className="flex mt-2"><Btn text="复制链接"><CopyOutlined className="text-white" /></Btn></div>
      </CopyToClipboard>
    </div>
  </div>
}

export default Qrcode
