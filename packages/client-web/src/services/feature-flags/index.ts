import { makeStorage } from "services/storage";

const features = ["NEW_AUTH"] as const;

type Feature = (typeof features)[number];

const storage = makeStorage<Record<Feature, boolean>>("feature-flags");

const getFeatureFlag = (feature: Feature) => {
  const flags = storage.getData();

  return flags?.[feature];
};

export const checkIsFeatureEnabled = (feature: Feature) =>
  getFeatureFlag(feature) ?? false;

const setFeatureFlag = (feature: Feature, isEnabled: boolean) => {
  storage.setProperty(feature, isEnabled);
};

const featureParamPrefix = "ff_";
const featureParams = features.map((f) => `${featureParamPrefix}${f}`);

export const initFeatureFlags = () => {
  const urlParams = new URLSearchParams(window.location.search);

  featureParams.forEach((param) => {
    const feature = param.slice(featureParamPrefix.length) as Feature;

    // Set from the URL
    if (urlParams.has(param)) {
      setFeatureFlag(feature, urlParams.get(param) === "true");
      return;
    }

    // Already set froma previous visit
    if (getFeatureFlag(feature) !== undefined) return;

    // Default to false
    setFeatureFlag(feature, false);
  });

  // Now that we've processed the feature flags, remove them from the URL.
  featureParams.forEach((fp) => urlParams.delete(fp));
  const urlParamsString = urlParams.toString();
  const searchString = urlParamsString ? `?${urlParamsString}` : "";
  const newUrl = `${window.location.pathname}${searchString}`;
  window.history.replaceState({}, "", newUrl);
};
