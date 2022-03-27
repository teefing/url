
import { Input } from 'antd'
import Editor from './components/editor'
import bgImage from '@/public/scattered-forcefields.svg'

const IndexPage = (): JSX.Element => {
  return (
    <div className="w-screen h-screen relative" style={{ background: `url(${bgImage})` }}>
      <div className="container mx-auto px-20">
        <h1 className="pt-24 mb-20 text-5xl text-center font-sans font-bold">URI 生成工具</h1>
        <Input.TextArea className="transition-all bg-transparent text-base placeholder:text-center" placeholder="输入你的 URI 或粘贴至此处" />
      </div>

      <Editor visible></Editor>

    </div>
  )
}

export default IndexPage
