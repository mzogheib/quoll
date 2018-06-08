import utils from './utils';

export default {
  make
};

function make({ id, name, getOauthUrl, authenticate, disconnect, getData, makeSummary, makeSummaryList, makeMapData }) {
  return {
    id,
    name,
    connect(token) {
      getOauthUrl().then(url => {
        const stateString = utils.encode({
          id: this.id,
          token: token
        });
        const urlWithState = utils.addQueryParams(url, { state: stateString });
        window.location.replace(urlWithState);
      });
    },
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
