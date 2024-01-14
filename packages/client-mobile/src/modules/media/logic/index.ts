import { useState } from "react";

export const useMedia = () => {
  const [isPermitted, setIsPermitted] = useState(false);

  const requestPermission = () => {
    setIsPermitted(true);
  };

  const revokePermission = () => {
    setIsPermitted(false);
  };

  return {
    requestPermission,
    revokePermission,
    isPermitted,
  };
};
