import React, { useState } from 'react'
import TestContent from '@/components/test/test.content'

export default () => {
  const [content, setContent] = useState(1)
  return (
    <div>
      <button
        onClick={() => {
          setContent(content + 1)
        }}
      ></button>
      <TestContent content={content.toString()} />
    </div>
  )
}
