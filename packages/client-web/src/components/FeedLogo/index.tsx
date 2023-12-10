import { FeedName } from '../../services/feeds/types';

const logoMap = {
  [FeedName.Toshl]: {
    colorSrc: require('./images/toshl-196x196.png'),
    grayscaleSrc: require('./images/toshl-gray-196x196.png'),
  },
  [FeedName.Strava]: {
    colorSrc: require('./images/strava-96x96.png'),
    grayscaleSrc: require('./images/strava-gray-96x96.png'),
  },
  [FeedName.Uber]: {
    colorSrc: require('./images/uber-256x256.png'),
    grayscaleSrc: require('./images/uber-gray-256x256.png'),
  },
  [FeedName.Moves]: {
    colorSrc: require('./images/moves-206x206.png'),
    grayscaleSrc: require('./images/moves-gray-206x206.png'),
  },
};

interface Props {
  name: FeedName;
  isGrayscale?: boolean;
}

const FeedLogo = ({ name, isGrayscale }: Props) => {
  const { colorSrc, grayscaleSrc } = logoMap[name];

  const src = isGrayscale ? grayscaleSrc : colorSrc;
  const alt = `${name} logo`;

  return <img src={src} alt={alt} />;
};

export default FeedLogo;
