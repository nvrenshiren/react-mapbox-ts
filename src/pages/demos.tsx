import LiveCode from '@/components/liveCode/live.code'
import demosRoutes from '@/utils/demos.routes'
import {
  CodeOutlined,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, PageHeader, Typography } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import React, { useCallback, useMemo, useState } from 'react'
import { dynamic } from 'umi'
import './demos.less'

const { Sider, Content } = Layout
const { Item, SubMenu } = Menu
const { Title } = Typography

const DemosPage: React.FC = () => {
  const [key, setKey] = useState('style-map')
  const [inlineCollapsed, setInlineCollapsed] = useState(false)
  const [viewCode, setViewCode] = useState(false)
  const [group, name] = useMemo(() => key.split('-'), [key])

  const menuItem = useMemo(() => {
    return demosRoutes[group].items.find((item) => item?.key === name)
  }, [key])

  const dynamicComponent = useCallback(() => {
    return dynamic({
      loader: () => import(`@/demos/demos.${group}.${name}`),
      loading: require('../components/page/page.loading').default,
      delay: 400
    })
  }, [key])
  const MenuClick = useCallback((param: ClickParam) => {
    setKey(param.key)
    setViewCode(false)
  }, [])
  const inlineClick = useCallback(() => {
    setTimeout(() => {
      window.map.resize()
    }, 300)
    setInlineCollapsed(!inlineCollapsed)
  }, [inlineCollapsed])
  const viewCodeClick = useCallback(() => {
    setViewCode(!viewCode)
    setTimeout(() => {
      window.map.resize()
    }, 300)
  }, [viewCode])
  const PreviewComponent = useMemo(() => dynamicComponent(), [key])
  return (
    <Layout id="DemosPage">
      <Sider
        theme="light"
        className="menu-side"
        width={inlineCollapsed ? 0 : 300}
      >
        <Menu
          mode="inline"
          selectedKeys={[key]}
          onClick={MenuClick}
          defaultOpenKeys={['style-group']}
        >
          {Object.keys(demosRoutes).map((name) => {
            const menu = demosRoutes[name]
            return (
              <SubMenu key={`${name}-group`} title={menu.title}>
                {menu.items.map((item) => {
                  return <Item key={`${name}-${item.key}`}>{item.name}</Item>
                })}
              </SubMenu>
            )
          })}
        </Menu>
      </Sider>
      <Content className="demos-content-wrap">
        <div className="demos-content">
          <PageHeader
            backIcon={
              inlineCollapsed ? (
                <StepForwardOutlined />
              ) : (
                <StepBackwardOutlined />
              )
            }
            className="content-header"
            onBack={inlineClick}
            title={menuItem.name}
            subTitle={menuItem.des}
            extra={
              <Button
                type="link"
                icon={<CodeOutlined />}
                onClick={viewCodeClick}
              >
                {viewCode ? '隐藏' : '显示'}代码
              </Button>
            }
          />
          <div className="demos-live">
            <LiveCode
              viewCode={viewCode}
              code={menuItem.code}
              preview={<PreviewComponent />}
            />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default DemosPage
