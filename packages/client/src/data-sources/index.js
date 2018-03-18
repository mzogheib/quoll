import config from './config';

export default config.map(make);

function make({ id, name, getOauthUrl, authenticate, disconnect, getData, makeSummary, makeSummaryList, normalize }) {
    return {
      id,
      name,
      isConnected: false,
      data: [],
      summary: '',
      summaryList: [],
      connect () {
        getOauthUrl().then(url => {
          const urlWithState = `${url}&state=${this.id}`;
          window.location.replace(urlWithState);
        });
      },
      authenticate (code) {
        return authenticate(code).then(() => { this.isConnected = true; })
      },
      disconnect () {
        return disconnect().then(() => {
          this.data = [];
          this.summaryList = [];
          this.summary = '';
          this.isConnected = false;
        });
      },
      getData (filter) {
        return getData(filter).then(data => {
          this.data = data
          this.summaryList = makeSummaryList(this.data);
          this.summary = makeSummary(this.data);
        });
      },
      normalize
    };
  };
