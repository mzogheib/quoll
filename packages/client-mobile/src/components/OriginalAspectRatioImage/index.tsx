import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageURISource } from "react-native";

import makeStyles from "./styles";

type PropsWidth = {
  source: ImageURISource;
  width: number;
  maxWidth?: never;
  height?: never;
  maxHeight?: number;
};

type PropsHeight = {
  source: ImageURISource;
  width?: never;
  maxWidth?: number;
  height: number;
  maxHeight?: never;
};

type Props = PropsWidth | PropsHeight;

const calculateBaseDimensions = ({
  width,
  height,
  aspectRatio,
}: {
  width: number | undefined;
  height: number | undefined;
  aspectRatio: number;
}) => {
  // If width is provided, calculate height based on aspect ratio
  if (width && !height) return { width, height: width / aspectRatio };

  // If height is provided, calculate width based on aspect ratio
  if (height && !width) return { width: height * aspectRatio, height };

  // Both or neither provided
  return { width, height };
};

const applyConstraints = ({
  dimensions,
  maxWidth,
  maxHeight,
  aspectRatio,
}: {
  dimensions: { width: number | undefined; height: number | undefined };
  maxWidth: number | undefined;
  maxHeight: number | undefined;
  aspectRatio: number;
}) => {
  const { width: baseWidth, height: baseHeight } = dimensions;

  // Apply maxHeight constraint if provided and needed
  if (maxHeight && baseHeight && baseHeight > maxHeight) {
    return { width: maxHeight * aspectRatio, height: maxHeight };
  }

  // Apply maxWidth constraint if provided and needed
  if (maxWidth && baseWidth && baseWidth > maxWidth) {
    return { width: maxWidth, height: maxWidth / aspectRatio };
  }

  return dimensions;
};

export const OriginalAspectRatioImage = ({
  source,
  width,
  height,
  maxHeight,
  maxWidth,
}: Props) => {
  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    if (!source.uri) return;

    Image.getSize(source.uri, (w, h) => {
      setImageWidth(w);
      setImageHeight(h);
    });
  }, [source.uri]);

  const hasSize = imageWidth !== undefined && imageHeight !== undefined;
  const aspectRatio = hasSize ? imageWidth / imageHeight : undefined;

  // Calculate final dimensions considering max constraints
  const finalDimensions = useMemo(() => {
    if (!aspectRatio) return { width, height };

    return applyConstraints({
      dimensions: calculateBaseDimensions({ width, height, aspectRatio }),
      maxWidth,
      maxHeight,
      aspectRatio,
    });
  }, [width, height, maxHeight, maxWidth, aspectRatio]);

  const styles = useMemo(
    () =>
      makeStyles(
        finalDimensions.height,
        finalDimensions.width,
        imageWidth,
        aspectRatio,
      ),
    [finalDimensions.height, finalDimensions.width, imageWidth, aspectRatio],
  );

  return <Image style={styles.container} source={source} />;
};
