import React from 'react'
import { Layout, Row, Col, Typography, Result, Button } from 'antd'

const { Title } = Typography
const DocsPage: React.FC = (props) => {
  return (
    <Row className="full" justify="center" align="middle">
      <Col>
        <Result
          title="待完善,可以移步github看源码"
          extra={
            <Button
              href="https://github.com/nvrenshiren/react-mapbox-ts"
              type="primary"
              key="console"
            >
              Go GitHub
            </Button>
          }
        />
      </Col>
    </Row>
  )
}

export default DocsPage
