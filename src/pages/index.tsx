import React from 'react'
import raw from 'raw.macro'
import LiveCode from '@/utils/live.code'
import './index.less'
import IndexPageDemo from '@/demos/index.page.demo'
const IndexPage: React.FC = () => {
  return (
    <div id="IndexPage">
      <LiveCode
        code={raw('../demos/raws/index.page.demo.raw')}
        disabled
        noInline={false}
        preview={<IndexPageDemo />}
      />
    </div>
  )
}

export default IndexPage
