import config from './config';
import utils from '../_utils';

export default config.map(make);

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
      return disconnect().then(() => {
        this.data = [];
        this.summaryList = [];
        this.summary = '';
        this.isConnected = false;
      });
    },
    getData(filter) {
      return getData(filter).then(data => {
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
