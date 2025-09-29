import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom'
import type Notice from '../interfaces/Notice';
import CategoryFilter from '../parts/CategoryFilter';
import NoticeCard from '../parts/NoticeCard';

Start.route = {
  path: '/',
  loader: async () => await (await fetch('/api/notices')).json()
}

export default function Start() {
  const notices = useLoaderData() as Notice[]
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filter notices based on current selectedCategory
  const filteredNotices = selectedCategory === 'all'
    ? notices
    : notices.filter(notice => {
      if (!notice.categories) return false;
      const categoryArray = notice.categories.split(' ').filter(cat => cat.trim() !== '')
      return categoryArray.includes(selectedCategory)
    })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }

  return (
    <>
      <Row>
        <Col>
          <div className='h2 text-center'>Notices</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <CategoryFilter
            notices={notices}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredNotices.map(notice => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onCategoryClick={handleCategoryChange}
          />
        ))}
      </Row>
    </>
  );
}