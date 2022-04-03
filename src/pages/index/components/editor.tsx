import { Layout } from 'antd'
import ParseResolver, { SubParseResolver } from './parser-resolver'
import Qrcode from './qrcode'
import QueryParser from './query-parser'

const { Content, Sider } = Layout
interface IProps {
  visible: boolean
}

const Editor = ({
  visible = true,
}: IProps) => {
  return <Layout hidden={!visible} className="absolute top-0 left-0 h-full w-full">
    <Content>
      <ParseResolver />
      <QueryParser />
      <SubParseResolver />
    </Content>
    <Sider width={500} className="p-10 bg-emerald-500">
      <Qrcode/>
    </Sider>
  </Layout>
}

export default Editor
