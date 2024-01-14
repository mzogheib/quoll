import { useState } from "react";

export const useMedia = () => {
  const [isPermitted, setIsPermitted] = useState(false);

  const requestPermission = () => {
    setIsPermitted(true);
  };

  return {
    requestPermission,
    isPermitted,
  };
};
