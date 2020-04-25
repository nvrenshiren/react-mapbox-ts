import { BarsOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons'
import { Layout, Menu, Typography } from 'antd'
import './index.less'
import React, { useCallback, useState } from 'react'
import { history } from 'umi'
import { ClickParam } from 'antd/lib/menu'
const { Item } = Menu
const { Header, Footer, Content } = Layout
const { Title } = Typography
const IndexLayout: React.FC = (props) => {
  const [current, setCurrent] = useState(location.pathname.split('/')[1] || '')
  const clickItem = useCallback((param: ClickParam) => {
    setCurrent(param.key)
    history.push(`/${param.key}`)
  }, [])
  return (
    <Layout id="IndexLayout" className="full">
      <Header className="head">
        <Title type="secondary">MapBox</Title>
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
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default IndexLayout
