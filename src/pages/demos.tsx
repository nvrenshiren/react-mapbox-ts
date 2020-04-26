import LiveCode from '@/utils/live.code'
import { Layout, Menu, PageHeader, Typography } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import raw from 'raw.macro'
import React, { useCallback, useMemo, useState } from 'react'
import { dynamic } from 'umi'
import './demos.less'
const { Sider, Content } = Layout
const { Item, ItemGroup } = Menu
const { Title } = Typography

interface MenuItem {
  title: string
  items: { name: string; key: string; code: string; des: string }[]
}

const menuList: { [key: string]: MenuItem } = {
  style: {
    title: '样式',
    items: [
      {
        name: '地图',
        key: 'map',
        code: raw('../demos/raws/demos.style.map.raw'),
        des: 'Display a map'
      },
      {
        name: '更改样式',
        key: 'changeStyle',
        code: raw('../demos/raws/demos.style.changeStyle.raw'),
        des: 'Display a map'
      }
    ]
  },
  layers: {
    title: '图层',
    items: []
  }
}

const DemosPage: React.FC = (props) => {
  const [key, setKey] = useState('style-map')
  const [inlineCollapsed, setInlineCollapsed] = useState(false)
  const [group, name] = useMemo(() => key.split('-'), [key])
  const menuItem = useMemo(
    () => menuList[group].items.find((item) => item.key === name),
    [key]
  )
  const dynamicComponent = useCallback(() => {
    return dynamic({
      loader: () => import(`@/demos/demos.${group}.${name}`)
    })
  }, [key])
  const MenuClick = useCallback((param: ClickParam) => {
    setKey(param.key)
  }, [])
  const inlineClick = useCallback(() => {
    setInlineCollapsed(!inlineCollapsed)
  }, [inlineCollapsed])
  const PreviewComponent = useMemo(() => dynamicComponent(), [key])
  return (
    <Layout id="DemosPage">
      <Sider
        theme="light"
        className="menu-side"
        width={inlineCollapsed ? 0 : 300}
      >
        <Menu mode="inline" selectedKeys={[key]} onClick={MenuClick}>
          {Object.keys(menuList).map((name) => {
            const menu = menuList[name]
            return (
              <ItemGroup
                key={`${name}-group`}
                title={<Title level={4}>{menu.title}</Title>}
              >
                {menu.items.map((item) => {
                  return <Item key={`${name}-${item.key}`}>{item.name}</Item>
                })}
              </ItemGroup>
            )
          })}
        </Menu>
      </Sider>
      <Content className="demos-content-wrap">
        <div className="demos-content">
          <PageHeader
            className="content-header"
            onBack={inlineClick}
            title={menuItem.name}
            subTitle={menuItem.des}
          />
          <div className="demos-live">
            <LiveCode code={menuItem.code} preview={<PreviewComponent />} />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default DemosPage
