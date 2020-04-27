import Icon, {
  BarsOutlined,
  AppstoreOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Layout, Menu, Typography, Row, Col } from 'antd'
import './index.less'
import { ReactSVG } from 'react-svg'
import React, { useCallback, useState } from 'react'
import { history } from 'umi'
import { ClickParam } from 'antd/lib/menu'
const { Item } = Menu
const { Header, Footer, Content } = Layout
const { Title, Text } = Typography
const IndexLayout: React.FC = (props) => {
  const [current, setCurrent] = useState(location.pathname.split('/')[1] || '')
  const clickItem = useCallback((param: ClickParam) => {
    setCurrent(param.key)
    history.push(`/${param.key}`)
  }, [])
  return (
    <Layout id="IndexLayout" className="full">
      <Header className="head">
        <Row align="middle" gutter={8}>
          <Col>
            <ReactSVG
              className="map-box-svg"
              src={require('@/assets/map-box.svg')}
            />
          </Col>
          <Col>
            <Text code>React typescript</Text>
          </Col>
        </Row>
        <div className="menu">
          <Menu mode="horizontal" onClick={clickItem} selectedKeys={[current]}>
            <Item key="index.html">
              <HomeOutlined />
              首页
            </Item>
            <Item key="docs.html">
              <BarsOutlined />
              文档
            </Item>
            <Item key="demos.html">
              <AppstoreOutlined />
              演示
            </Item>
          </Menu>
        </div>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  )
}

export default IndexLayout
