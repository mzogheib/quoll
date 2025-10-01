import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageURISource } from "react-native";

import makeStyles from "./styles";

type Props = {
  source: ImageURISource;
  width?: number;
  height?: number;
};

export const OriginalAspectRatioImage = ({ source, width, height }: Props) => {
  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    if (!source.uri) return;

    Image.getSize(source.uri, (width_, height_) => {
      setImageWidth(width_);
      setImageHeight(height_);
    });
  }, [source.uri]);

  const hasSize = imageWidth !== undefined && imageHeight !== undefined;

  const originalAspectRatio = hasSize ? imageWidth / imageHeight : undefined;

  const hasCustomSize = width !== undefined && height !== undefined;

  const aspectRatio = hasCustomSize ? width / height : originalAspectRatio;

  const styles = useMemo(
    () => makeStyles(height, width, imageWidth, aspectRatio),
    [height, width, imageWidth, aspectRatio],
  );

  return <Image style={styles.container} source={source} />;
};
