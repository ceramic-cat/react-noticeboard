import { Button } from 'react-bootstrap';
import type Notice from '../interfaces/Notice';

interface CategoryFilterProps {
    notices: Notice[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ notices, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    // Extract all unique categories from all notices
    const allCategories = notices
        .flatMap(notice =>
            notice.categories
                ? notice.categories.split(' ').filter(cat => cat.trim() !== '')
                : []
        )
        .filter((category, index, array) => array.indexOf(category) === index) // Remove duplicates
        .sort(); // Sort alphabetically

    return (
        <div className='mb-3 mt-2'>
            <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
                size="sm"
                className='me-2 mt-2'
                onClick={() => onCategoryChange('all')}
            >
                All {notices.length}
            </Button>
            {allCategories.map(category => {
                const count = notices.filter(notice =>
                    notice.categories?.split(' ').includes(category)
                ).length;

                return (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                        size="sm"
                        className='me-2 mt-2'
                        onClick={() => onCategoryChange(category)}
                    >
                        {category} ({count})
                    </Button>
                );
            })}
        </div>
    );
}