import React from 'react'
import raw from 'raw.macro'
import LiveCode from '@/components/liveCode/live.code'
import './index.less'
import Demo from '@/demos/index.page.demo'
const IndexPage: React.FC = () => {
  return (
    <div id="IndexPage">
      <LiveCode
        code={raw('../demos/raws/index.page.demo.raw')}
        disabled
        noInline={false}
        preview={<Demo />}
      />
    </div>
  )
}

export default IndexPage
