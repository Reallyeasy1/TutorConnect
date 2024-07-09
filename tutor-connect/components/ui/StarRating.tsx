import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface StarRatingProps {
    rating: number;
    starSize?: string; // Optional prop to set the size of stars
}

const StarRating: React.FC<StarRatingProps> = ({ rating, starSize = '32px' }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - Math.ceil(rating);
    const starCut = (rating / totalStars) * 100 + '%';

    return (
        <div style={{ display: 'flex' }}>
            {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon
                    key={`full-${index}`}
                    icon={faStar}
                    style={{ color: '#FFD700', fontSize: starSize }}
                />
            ))}
            {hasHalfStar && (
                <div style={{ position: 'relative', display: 'inline-block', width: "36px" }}>
                    <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: '#ddd', position: 'absolute', left: 0, top: 0, fontSize: starSize }}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        style={{
                            color: '#FFD700',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            clipPath: `inset(0 ${starCut} 0 0)`,
                            fontSize: starSize
                        }}
                    />
                </div>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon
                    key={`empty-${index}`}
                    icon={faStar}
                    style={{ color: '#ddd', fontSize: starSize }}
                />
            ))}
        </div>
    );
};

export default StarRating;
