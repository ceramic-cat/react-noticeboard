import { Col, Card, Badge } from 'react-bootstrap';
import type Notice from '../interfaces/Notice';


interface NoticeCardProps {
    notice: Notice;
    onCategoryClick?: (category: string) => void;
}

export default function NoticeCard({ notice, onCategoryClick }: NoticeCardProps) {
    const { id, userId, header, textBody, categories } = notice;

    // Split categories string into array and filter out empty strings
    const categoryArray = categories ? categories.split(' ').filter(cat => cat.trim() !== '') : [];

    return (
        <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={id}
            className='mb-3'
        >
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
                                    style={onCategoryClick ? { cursor: 'pointer' } : undefined}
                                    onClick={onCategoryClick ? () => onCategoryClick(category) : undefined}
                                >
                                    {category}
                                </Badge>
                            ))}
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}