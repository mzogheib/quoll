export default {
  make
};

function make({ id, name, getOauthUrl, authenticate, disconnect, getData, makeSummary, makeSummaryList, makeMapData }) {
  return {
    id,
    name,
    getOauthUrl,
    authenticate,
    disconnect,
    getData(date) {
      return getData({ from: date, to: date });
    },
    makeMapData,
    makeSummary,
    makeSummaryList
  };
};
