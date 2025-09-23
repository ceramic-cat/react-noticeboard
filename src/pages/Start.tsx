import { useState } from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const allCategories = notices.flatMap(notice => notice.categories
    ? notice.categories.split(' ').filter(cat => cat.trim() !== '') // split categories and trim empty ones
    : [] // no categories
  ).filter((category, index, array) => array.indexOf(category) === index) // filter duplicates
    .sort()
  console.log(allCategories)

  return <>
    <Row>
      <Col>
        <h2>Notices</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          Categories&nbsp;
          <Button variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'} size="sm" onClick={() => setSelectedCategory('all')}>All {notices.length}</Button>
          {allCategories.map(category => {
            const count = notices.filter(notice =>
              notice.categories?.split(' ').includes(category)
            ).length;

            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Button>
            );
          })}
        </div>
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