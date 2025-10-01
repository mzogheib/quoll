type Dimensions = {
  width: number;
  height: number;
};

type CalculateRectDimensionsParamsWidth = {
  width: number;
  height?: never;
  aspectRatio: number;
};

type CalculateRectDimensionsParamsHeight = {
  width?: never;
  height: number;
  aspectRatio: number;
};

type CalculateRectDimensionsParams =
  | CalculateRectDimensionsParamsWidth
  | CalculateRectDimensionsParamsHeight;

/**
 * Calculates a set of rectangular dimensions based on a given width or height
 * and a fixed aspect ratio.
 */
export const calculateRectDimensions = ({
  width,
  height,
  aspectRatio,
}: CalculateRectDimensionsParams): Dimensions => {
  // If width is provided, calculate height based on aspect ratio
  if (width !== undefined) return { width, height: width / aspectRatio };

  // Otherwise, height must be provided so calculate width instead
  return { width: height * aspectRatio, height };
};

type ApplyConstraintsParams = {
  dimensions: Dimensions;
  maxWidth: number | undefined;
  maxHeight: number | undefined;
};

/**
 * Applies maximum width and height constraints to a set of dimensions while maintaining aspect ratio.
 */
export const applyConstraints = ({
  dimensions,
  maxWidth,
  maxHeight,
}: ApplyConstraintsParams): Dimensions => {
  const { width: baseWidth, height: baseHeight } = dimensions;
  const aspectRatio = baseWidth / baseHeight;

  // Apply maxHeight constraint if provided and needed
  if (maxHeight !== undefined && baseHeight > maxHeight) {
    return calculateRectDimensions({ height: maxHeight, aspectRatio });
  }

  // Apply maxWidth constraint if provided and needed
  if (maxWidth !== undefined && baseWidth > maxWidth) {
    return calculateRectDimensions({ width: maxWidth, aspectRatio });
  }

  return dimensions;
};
