import Icon from "react-native-vector-icons/MaterialIcons";
import { FeedName } from "@quoll/lib";
import { colorPalette } from "@quoll/ui-primitives";

const iconMap = {
  toshl: null,
  strava: "directions-run",
  media: "image",
  location: "my-location",
};

interface Props {
  name: FeedName | "location";
  size: number;
  isGrayscale?: boolean;
}

const FeedLogo = ({ name, size, isGrayscale }: Props) => {
  const iconName = iconMap[name];

  if (!iconName) return null;

  const color = isGrayscale
    ? colorPalette.matterhorn
    : colorPalette.mediumAquamarine;

  return <Icon name={iconName} size={size} color={color} aria-label={name} />;
};

export default FeedLogo;
