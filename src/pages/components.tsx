import React from 'react'
import { Layout } from 'antd'
const { Sider, Content } = Layout
const ComponentsPage: React.FC = () => {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Content>Content</Content>
    </Layout>
  )
}

export default ComponentsPage
