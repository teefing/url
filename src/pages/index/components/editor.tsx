import { Layout } from 'antd'
import { useRecoilValue } from 'recoil'
import { composedURIState } from '../selectors'
import ParseResolver from './parser-resolver'
import Qrcode from './qrcode'

const { Content, Sider } = Layout
interface IProps {
  visible: boolean
}

const Editor = ({
  visible = true,
}: IProps) => {
  return <Layout hidden={!visible} className="absolute top-0 left-0 h-full w-full">
    <Content>
      <ParseResolver></ParseResolver>
    </Content>
    <Sider width={500} className="p-10 bg-emerald-500">
      <Qrcode/>
    </Sider>
  </Layout>
}

export default Editor
