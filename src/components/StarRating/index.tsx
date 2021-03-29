import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

interface IStarRatingProps {
  stars: number;
  totalStars: number;
}

const StarRating: React.FC<IStarRatingProps> = ({
  stars,
  totalStars,
}: IStarRatingProps) => {
  const ratingArray = useMemo(() => {
    const coloredStars = stars;

    let starsArray = [];

    let iterator = 0;
    while (iterator < totalStars) {
      if (iterator < coloredStars) {
        starsArray.push({key: iterator, value: true});
      } else {
        starsArray.push({key: iterator, value: false});
      }
      iterator++;
    }

    return starsArray;
  }, [stars, totalStars]);

  return (
    <>
      {ratingArray.map((rating) => (
        <Icon
          key={rating.key}
          name={rating.value ? 'star' : 'staro'}
          size={19}
          color={'#FFFF00'}
        />
      ))}
    </>
  );
};

export default StarRating;
