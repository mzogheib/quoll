export const clusterStyle = {
  circleColor: [
    "step",
    ["get", "point_count"],
    "#51bbd6", // Color when count < 100
    100,
    "#f1f075", // Color when 100 <= count < 750
    750,
    "#f28cb1", // Color when count >= 750
  ],
  circleRadius: [
    "step",
    ["get", "point_count"],
    20, // Radius when count < 100
    100,
    30, // Radius when 100 <= count < 750
    750,
    40, // Radius when count >= 750
  ],
  circleStrokeWidth: 2,
  circleStrokeColor: "#ffffff",
};

export const clusterCountStyle = {
  textField: ["get", "point_count_abbreviated"],
  textSize: 14,
  textColor: "#ffffff",
  textFont: ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
};

export const markerStyle = {
  circleColor: "#007cbf",
  circleRadius: 6,
  circleStrokeWidth: 2,
  circleStrokeColor: "#ffffff",
};
