import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom'
import type Notice from '../interfaces/Notice';

Start.route = {
  path: '/',
  menuLabel: 'Start',
  index: 1,
  loader: async () => await (await fetch('/api/notices')).json()
}

export default function Start() {
  const notices = useLoaderData() as Notice[]
  notices.map((z) => console.log(z.header))

  return <>
    <Row>
      <Col>
        <h2>Notices</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        {notices.map(({
          id,
          userId,
          header,
          textBody,
          categories
        }) => {
          // Split categories string into array and filter out empty strings
          const categoryArray = categories ? categories.split(' ').filter(cat => cat.trim() !== '') : [];

          return <Col
            xs={12}
            md={6}
            lg={4}
            key={id}
            className='mb-3'>
            <Card className='notice-card'>
              <Card.Body>
                <Card.Title>{header}</Card.Title>
                <Card.Text>{textBody}</Card.Text>
                <Card.Text>UserId:&nbsp;{userId}</Card.Text>
                {categoryArray.length > 0 && (
                  <Card.Text>
                    Categories: {' '}
                    {categoryArray.map((category, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        className="me-1"
                      >
                        {category}
                      </Badge>
                    ))}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        })}
      </Col>
    </Row>
  </>
}