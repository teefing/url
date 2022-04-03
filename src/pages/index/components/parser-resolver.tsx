
import { Input as AntdInput, Card, Col, Form, Row } from 'antd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ChosenQueryState, QueryState, URIState } from '../atoms'
import type { URI } from '../types'
import { generateURI, isURI, parseURI } from '../utils'

const Input = (props: React.ComponentProps<typeof AntdInput>): JSX.Element =>
  <AntdInput bordered={true} className="bg-transparent border-x-transparent border-t-transparent focus:border-x-transparent focus:border-t-transparent hover:border-x-transparent hover:border-t-transparent focus:shadow-none" {...props} />

const ParseResolverLayout = ({ URI, onValuesChange }:
{
  URI: URI
  onValuesChange: (changedValues: any) => void
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(URI)
  }, [JSON.stringify(URI)])

  return <div className="p-5">
    <Card className="rounded-md relative before:absolute before:top-1 before:right-5 before:text-4xl before:font-bold before:text-gray-300 before:italic before:pointer-events-none before:select-none before:content-['URI']" bodyStyle={{ padding: '10px' }} hoverable>
      <Form form={form} onValuesChange={onValuesChange}>
        <Row>
          <Col span={11} offset={1}>
            <Form.Item label="protocol" name="protocol"><Input></Input></Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="auth" name="auth"><Input></Input></Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={11} offset={1}>
            <Form.Item label="host" name="host"><Input></Input></Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="port" name="port"><Input></Input></Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={23} offset={1}>
            <Form.Item label="path" name="path"><Input></Input></Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={23} offset={1}>
            <Form.Item label="query" name="query"><Input></Input></Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={23} offset={1}>
            <Form.Item label="fragment" name="fragment"><Input></Input></Form.Item>
          </Col>
        </Row>
      </Form>

    </Card>
  </div>
}

const ParseResolver = () => {
  const [URI, setURI] = useRecoilState(URIState)
  const onValuesChange = useCallback((changedValues) => {
    setURI(old => ({
      ...old,
      ...changedValues,
    }))
  }, [])

  return <ParseResolverLayout URI={URI} onValuesChange={onValuesChange} />
}

export const SubParseResolver = () => {
  const [{ index, key, value }, setChooseQuery] = useRecoilState(ChosenQueryState)
  const setList = useSetRecoilState(QueryState)
  const [URI, setURI] = useState<URI | null>(null)

  useEffect(() => {
    if (!value || !isURI(value)) {
      setURI(null)
    }
    else {
      const res = parseURI(value)
      setURI(res)
    }
  }, [value])
  const onValuesChange = useCallback((changedValues) => {
    // 更改主URI中的query的对应state
    setURI((old) => {
      const newURI = {
        ...old,
        ...changedValues,
      }
      const newUrl = generateURI(newURI)
      setChooseQuery({
        index,
        key,
        value: newUrl,
      })

      setList((old) => {
        const newList = old.slice()
        newList.splice(index, 1, [key, newUrl])
        return newList
      })

      return newURI
    })
  }, [index, key])

  if (!URI) return null

  return <ParseResolverLayout URI={URI} onValuesChange={onValuesChange} />
}

export default ParseResolver
