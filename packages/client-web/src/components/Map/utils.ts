export const decodePath = (path: string) =>
  google.maps.geometry.encoding.decodePath(path);

type MakeBoundsParams = {
  markersOptions?: google.maps.MarkerOptions[];
  polylinesOptions?: google.maps.PolylineOptions[];
};

export const makeBounds = ({
  markersOptions,
  polylinesOptions,
}: MakeBoundsParams) => {
  const bounds = new google.maps.LatLngBounds();

  if (markersOptions) {
    markersOptions.forEach((markerOptions) => {
      const { position } = markerOptions;

      if (position) bounds.extend(position);
    });
  }

  if (polylinesOptions) {
    polylinesOptions.forEach((polylineOptions) =>
      polylineOptions.path?.forEach((position) => bounds.extend(position))
    );
  }

  return bounds;
};
