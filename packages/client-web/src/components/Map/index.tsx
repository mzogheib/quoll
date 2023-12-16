import { Wrapper, Status } from "@googlemaps/react-wrapper";

import MapPlaceholder from "./Placeholder";
import MapComponent, { Props as ComponentProps } from "./Component";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

type OwnProps = {
  onMapLoaded: () => void;
};

type Props = ComponentProps & OwnProps;

const Map = ({ onMapLoaded, ...rest }: Props) => {
  if (!apiKey) {
    return <MapPlaceholder text="Hmm could not load map - missing API key" />;
  }

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <MapPlaceholder text="Loading" />;
      case Status.SUCCESS:
        return <MapComponent {...rest} />;
      case Status.FAILURE:
      default:
        return <MapPlaceholder text="Hmm could not load map" />;
    }
  };

  const handleCallback = (status: Status) => {
    if (status === Status.SUCCESS) {
      onMapLoaded();
    }
  };

  return (
    <Wrapper
      apiKey={apiKey}
      libraries={["geometry"]}
      render={render}
      callback={handleCallback}
    />
  );
};

export default Map;
