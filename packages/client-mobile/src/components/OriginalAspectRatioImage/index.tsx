import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageURISource } from "react-native";

import makeStyles from "./styles";
import { applyConstraints, calculateRectDimensions } from "./utils";

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

    /** The unconstrained dimensions of the image */
    const dimensions =
      width !== undefined
        ? calculateRectDimensions({ width, aspectRatio })
        : calculateRectDimensions({ height, aspectRatio });

    return applyConstraints({ dimensions, maxWidth, maxHeight });
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
