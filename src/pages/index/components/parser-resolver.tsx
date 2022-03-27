
import { Input as AntdInput, Card, Col, Form, Row } from 'antd'
import { useRecoilState } from 'recoil'
import { URIState } from '../atoms'

const Input = (props: React.ComponentProps<typeof AntdInput>): JSX.Element =>
  <AntdInput bordered={true} className="border-x-transparent border-t-transparent focus:border-x-transparent focus:border-t-transparent hover:border-x-transparent hover:border-t-transparent focus:shadow-none" {...props} />

const ParseResolver = () => {
  const [form] = Form.useForm()
  const [URI, setURI] = useRecoilState(URIState)

  useEffect(() => {
    form.setFieldsValue(URI)
  }, [JSON.stringify(URI)])

  const onValuesChange = useCallback((changedValues) => {
    setURI(old => ({
      ...old,
      ...changedValues,
    }))
  }, [])

  return <div className="p-5">
    <Card className="rounded-md" bodyStyle={{ padding: '10px' }} hoverable>
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

export default ParseResolver
