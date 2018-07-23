import dataSourceServices from '../../services/data-sources';

export const setDataSourceConnected = (name, value) => ({
  type: 'SET_DATA_SOURCE_CONNECTED',
  name,
  value
});

export const setDataSourceAuthenticating = (name, value) => ({
  type: 'SET_DATA_SOURCE_AUTHENTICATING',
  name,
  value
});

export const getOauthUrl = name => {
  const dataSourceService = dataSourceServices.find(dataSource => dataSource.name === name);
  return (dispatch) => {
    dispatch(setDataSourceAuthenticating(name, true));
    return dataSourceService.getOauthUrl().then(url => {
      return url;
    })
  };
};

export const authenticateDataSource = (name, code) => {
  const dataSourceService = dataSourceServices.find(dataSource => dataSource.name === name);
  return (dispatch) => {
    dispatch(setDataSourceAuthenticating(name, true));
    return dataSourceService.authenticate({ code }).then(() => {
      dispatch(setDataSourceConnected(name, true));
      dispatch(setDataSourceAuthenticating(name, false));
    })
  };
};

export const disconnectDataSource = (name) => {
  const dataSourceService = dataSourceServices.find(dataSource => dataSource.name === name);
  return (dispatch) => {
    dispatch(setDataSourceAuthenticating(name, true));
    return dataSourceService.disconnect().then(alert => {
      dispatch(setDataSourceConnected(name, false));
      dispatch(setDataSourceAuthenticating(name, false));
      return alert;
    })
  };
};

const defaultDataSources = dataSourceServices.map(config => ({
  name: config.name,
  title: config.title,
  link: config.link,
  image: config.image,
  isConnected: false,
  isAuthenticating: false,
}));

const dataSources = (state = defaultDataSources, action) => {
  switch (action.type) {
    case 'SET_DATA_SOURCE_CONNECTED':
      return state.map(dataSource => dataSource.name === action.name ? { ...dataSource, isConnected: action.value } : dataSource)
    case 'SET_DATA_SOURCE_AUTHENTICATING':
      return state.map(dataSource => dataSource.name === action.name ? { ...dataSource, isAuthenticating: action.value } : dataSource)
    default:
      return state;
  }
};

export default dataSources;
