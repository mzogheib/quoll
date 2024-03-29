import { FeedName } from "@quoll/lib";

const logoMap = {
  toshl: {
    colorSrc: require("./images/toshl-196x196.png"),
    grayscaleSrc: require("./images/toshl-gray-196x196.png"),
  },
  strava: {
    colorSrc: require("./images/strava-96x96.png"),
    grayscaleSrc: require("./images/strava-gray-96x96.png"),
  },
  uber: {
    colorSrc: require("./images/uber-256x256.png"),
    grayscaleSrc: require("./images/uber-gray-256x256.png"),
  },
  moves: {
    colorSrc: require("./images/moves-206x206.png"),
    grayscaleSrc: require("./images/moves-gray-206x206.png"),
  },
  media: {
    colorSrc: null,
    grayscaleSrc: null,
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
