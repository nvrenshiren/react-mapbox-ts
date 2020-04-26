import React, { useCallback, useState } from 'react'
import './live.code.less'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Row, Col } from 'antd'
import { EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons'

interface Props {
  code: string
  scope?: { [key: string]: any }
  disabled?: boolean
  preview?: JSX.Element
  noInline?: boolean
}

const LiveCode: React.FC<Props> = (props) => {
  const { code, scope, disabled, preview, noInline = true } = props
  const [viewCode, setViewCode] = useState(true)
  const viewClick = useCallback(() => {
    setViewCode(!viewCode)
  }, [viewCode])
  return (
    <LiveProvider
      code={code}
      noInline={preview ? false : noInline}
      scope={scope}
      language="typescript"
      theme={{
        plain: {
          color: '#e7d2ed'
        },
        styles: [
          {
            types: ['prolog', 'comment', 'doctype', 'cdata'],
            style: {
              color: 'hsl(30, 20%, 50%)'
            }
          },
          {
            types: [
              'property',
              'tag',
              'boolean',
              'number',
              'constant',
              'symbol'
            ],
            style: { color: '#f677e1' }
          },
          {
            types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
            style: {
              color: 'hsl(75, 70%, 70%)'
            }
          },
          {
            types: [
              'operator',
              'entity',
              'url',
              'string',
              'variable',
              'language-css'
            ],
            style: {
              color: 'hsl(40, 90%, 70%)'
            }
          },
          {
            types: ['deleted'],
            style: {
              color: 'rgb(255, 85, 85)'
            }
          },
          {
            types: ['italic'],
            style: {
              fontStyle: 'italic'
            }
          },
          {
            types: ['important', 'bold'],
            style: {
              fontWeight: 'bold'
            }
          },
          {
            types: ['regex', 'important'],
            style: {
              color: '#e90'
            }
          },
          {
            types: ['atrule', 'attr-value', 'keyword'],
            style: {
              color: '#f677e1'
            }
          },
          {
            types: ['punctuation', 'symbol'],
            style: {
              opacity: 0.7
            }
          }
        ]
      }}
    >
      <Row id="LiveCode" justify="space-between">
        <Col className="codebox">
          <Row className="wrap">
            <Col
              xs={viewCode ? 24 : 1}
              lg={viewCode ? 12 : 1}
              className="editor"
            >
              <div className="viewcode" onClick={viewClick}>
                {viewCode ? <EyeInvisibleTwoTone /> : <EyeTwoTone />}
              </div>
              <LiveEditor
                disabled={!!disabled || !!preview}
                style={{ display: viewCode ? 'block' : 'none' }}
              />
            </Col>
            <Col className="preview" xs={24} lg={viewCode ? 12 : 23}>
              {preview || <LivePreview />}
            </Col>
          </Row>
        </Col>
        <Col className="error" hidden={!!preview}>
          <LiveError />
        </Col>
      </Row>
    </LiveProvider>
  )
}
export default LiveCode
