import { AppstoreOutlined, BarsOutlined, HomeOutlined } from '@ant-design/icons'
import React, { useCallback, useState } from 'react'
import { ClickParam } from 'antd/lib/menu'
import { Col, Layout, Menu, Row, Typography } from 'antd'
import { history } from 'umi'
import { ReactSVG } from 'react-svg'
import './index.less'
const { Item } = Menu
const { Header, Content } = Layout
const { Text } = Typography
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
