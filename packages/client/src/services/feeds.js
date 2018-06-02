import utils from './utils';

export default {
  make
};

function make({ id, name, getOauthUrl, authenticate, disconnect, getData, makeSummary, makeSummaryList, makeMapData, isMarker, isPolyline }) {
  return {
    id,
    name,
    isConnected: false,
    data: [],
    summary: '',
    summaryList: [],
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
    authenticate(code) {
      return authenticate(code).then(() => { this.isConnected = true; })
    },
    disconnect() {
      return disconnect().then(alert => {
        this.data = [];
        this.summaryList = [];
        this.summary = '';
        this.isConnected = false;
        return alert;
      });
    },
    getData(date) {
      return getData({ from: date, to: date }).then(data => {
        this.data = data
        this.summaryList = makeSummaryList(this.data);
        this.summary = makeSummary(this.data);
      });
    },
    makeMapData,
    isMarker,
    isPolyline
  };
};
