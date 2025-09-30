import { Col, Card, Badge } from 'react-bootstrap';
import type Notice from '../interfaces/Notice';


interface NoticeCardProps {
    notice: Notice;
    onCategoryClick?: (category: string) => void;
}

export default function NoticeCard({ notice, onCategoryClick }: NoticeCardProps) {
    const { id, header, textBody, categories, author } = notice;

    // Split categories string into array and filter out empty strings
    const categoryArray = categories ? String(categories).split(' ').filter(cat => cat.trim() !== '') : [];

    return (
        <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={id}
            className='mb-3'
        >
            <Card border="dark" >
                <Card.Body className='p-1'>
                    <Card.Title as="h5" className='p-2'>{header}</Card.Title>
                    <Card.Text className='px-2'>
                        <p>
                            {textBody}
                        </p>
                        <p className='text-muted small'>
                            User:&nbsp;{author}
                        </p>
                    </Card.Text>
                    {categoryArray.length > 0 && (
                        <Card.Footer>
                            {categoryArray.map((category, index) => (
                                <Badge
                                    key={index}
                                    bg="primary"
                                    className="me-1"
                                    style={onCategoryClick ? { cursor: 'pointer' } : undefined}
                                    onClick={onCategoryClick ? () => onCategoryClick(category) : undefined}
                                >
                                    {category}
                                </Badge>
                            ))}
                        </Card.Footer>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}