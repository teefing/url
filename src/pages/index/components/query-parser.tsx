
import { ArrowRightOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Input as AntdInput, Card, Col, Row } from 'antd'
import type { ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import cls from 'classnames'
import { ChosenQueryState, QueryState, URIState } from '../atoms'
import { queryObjectState } from '../selectors'
import { isURI, listToObject, stringifyQuery } from '../utils'

const Input = (props: React.ComponentProps<typeof AntdInput>): JSX.Element =>
  <AntdInput bordered={true} className="bg-transparent border-x-transparent border-t-transparent focus:border-x-transparent focus:border-t-transparent hover:border-x-transparent hover:border-t-transparent focus:shadow-none" {...props} />

const QueryParser = () => {
  const queryObject = useRecoilValue<Record<string, any>>(queryObjectState)
  const [URI, setURI] = useRecoilState(URIState)
  const [list, setList] = useRecoilState(QueryState)
  const [chosenQuery, setChosenQuery] = useRecoilState(ChosenQueryState)

  useEffect(() => {
    if (queryObject)
      setList(Object.entries(queryObject))
  }, [URI.query])

  const onChangeKey = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const item = list[index]
    item[0] = e.target.value
    list.splice(index, 1, item)
    setList([...list])
  }

  const onChangeValue = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newList = list.slice()
    const item = newList[index]
    const newItem: [string, string] = [item[0], e.target.value]
    newList.splice(index, 1, newItem)
    setList(newList)

    if (index === chosenQuery.index) {
      setChosenQuery({
        index,
        key: newItem[0],
        value: newItem[1],
      })
    }
  }

  const onRemoveItem = (index: number) => () => {
    const newList = list.slice()
    newList.splice(index, 1)
    setList(newList)
  }

  const onAddItem = () => {
    setList([...list, ['', '']])
  }

  useEffect(() => {
    const obj = listToObject(list.filter(item => item[0] || item[1]))
    const query = stringifyQuery(obj)
    setURI((old) => {
      return {
        ...old,
        query,
      }
    })
  }, [list])

  const onClickArrow = ({ isActive, key, value, index }) => () => {
    if (isActive) {
      setChosenQuery({
        index: -1,
        key: '',
        value: '',
      })
    }
    else {
      setChosenQuery({
        index, key, value,
      })
    }
  }

  return <div className="p-5 pt-0">
    <Card className="rounded-md relative before:absolute before:top-1 before:right-5 before:text-4xl before:font-bold before:text-gray-300 before:italic before:pointer-events-none before:select-none before:content-['QUERY']" bodyStyle={{ padding: '10px' }} hoverable>
      {list.map(([key, value], index) => {
        const active = isURI(value) && chosenQuery.index === index
        return <Row key={index}>
          <Col span={5} offset={1}>
            <Input value={key} onChange={onChangeKey(index)} />
          </Col>
          <Col span={1} className={cls('flex items-center justify-center')} onClick={onClickArrow({ isActive: active, index, key, value })}>
            <ArrowRightOutlined className={cls('origin-center transition-transform duration-100 ease-linear', {
              'text-amber-400': isURI(value),
              'rotate-0': !active,
              'rotate-90': active,
            })} />
          </Col>
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
