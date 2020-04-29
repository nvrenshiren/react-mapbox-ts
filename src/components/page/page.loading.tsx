import React from 'react'

import { Spin, Row, Col } from 'antd'
const Loading: React.FC = () => {
  return (
    <Row justify="center" align="middle" className="full">
      <Col>
        <Spin size="large"></Spin>
      </Col>
    </Row>
  )
}
export default Loading
