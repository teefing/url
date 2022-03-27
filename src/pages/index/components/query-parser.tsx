
import { ArrowRightOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Input as AntdInput, Card, Col, Row } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { URIState } from '../atoms'
import { queryObjectState } from '../selectors'
import { listToObject, stringifyQuery } from '../utils'

const Input = (props: React.ComponentProps<typeof AntdInput>): JSX.Element =>
  <AntdInput bordered={true} className="bg-transparent border-x-transparent border-t-transparent focus:border-x-transparent focus:border-t-transparent hover:border-x-transparent hover:border-t-transparent focus:shadow-none" {...props} />

const QueryParser = () => {
  const queryObject = useRecoilValue<Record<string, any>>(queryObjectState)
  const [URI, setURI] = useRecoilState(URIState)
  const [list, setList] = useState<[string, string][]>([])

  useEffect(() => {
    if (queryObject)
      setList(Object.entries(queryObject))
  }, [URI.query])

  const onValuesChange = useCallback(() => {
    const obj = listToObject(list.filter(item => item[0] || item[1]))
    const query = stringifyQuery(obj)
    setURI((old) => {
      return {
        ...old,
        query,
      }
    })
  }, [list])

  const onChangeKey = (index: number) => (e: any) => {
    const item = list[index]
    item[0] = e.target.value
    list.splice(index, 1, item)
    setList([...list])
    onValuesChange()
  }

  const onChangeValue = (index: number) => (e: any) => {
    const item = list[index]
    item[1] = e.target.value
    list.splice(index, 1, item)
    setList([...list])
    onValuesChange()
  }

  const onRemoveItem = (index: number) => () => {
    list.splice(index, 1)
    setList([...list])
    onValuesChange()
  }

  const onAddItem = () => {
    setList([...list, ['', '']])
    onValuesChange()
  }

  return <div className="p-5">
    <Card className="rounded-md relative before:absolute before:top-1 before:right-5 before:text-4xl before:font-bold before:text-gray-300 before:italic before:pointer-events-none before:select-none before:content-['QUERY']" bodyStyle={{ padding: '10px' }} hoverable>
      {list.map(([key, value], index) => {
        return <Row key={index}>
          <Col span={5} offset={1}>
            <Input value={key} onChange={onChangeKey(index)} />
          </Col>
          <Col span={1} className="flex items-center justify-center"><ArrowRightOutlined /></Col>
          <Col span={16}>
            <Input value={value} onChange={onChangeValue(index)} />
          </Col>
          <Col span={1} className="flex items-center justify-center" onClick={onRemoveItem(index)}><MinusCircleOutlined className="text-red-500" /></Col>
        </Row>
      })}

      <Row>
        <Col offset={1}>
          <div className="flex items-center justify-center mt-2" onClick={onAddItem}>
            <PlusCircleOutlined className="text-green-600" />
            <div className="text-green-600 ml-1" >添加参数</div>
          </div>
        </Col>
      </Row>

    </Card>
  </div>
}

export default QueryParser
