import { makeStorage } from "services/storage";

const features = ["NEW_AUTH"] as const;

type Feature = (typeof features)[number];

const storage = makeStorage<Record<Feature, boolean>>("feature-flags");

export const checkIsFeatureEnabled = (feature: Feature) => {
  const flags = storage.getData();

  if (flags === null) return false;

  return flags[feature] ?? false;
};

const setFeatureFlag = (feature: Feature, isEnabled: boolean) => {
  storage.setProperty(feature, isEnabled);
};

const featureParamPrefix = "ff_";
const featureParams = features.map((f) => `${featureParamPrefix}${f}`);

export const initFeatureFlags = () => {
  const urlParams = new URLSearchParams(window.location.search);

  featureParams.forEach((param) => {
    const feature = param.slice(featureParamPrefix.length) as Feature;
    if (urlParams.has(param)) {
      setFeatureFlag(feature, urlParams.get(param) === "true");
      urlParams.delete(param);
    } else {
      setFeatureFlag(feature, false);
    }
  });

  // Remove the feature feature params now that we've processed them
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};
