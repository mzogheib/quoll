import dataSourceServices from '../../services/data-sources'

export const setDataSourceConnected = (name, value) => ({
  type: 'SET_DATA_SOURCE_CONNECTED',
  name,
  value,
})

export const setDataSourceAuthenticating = (name, value) => ({
  type: 'SET_DATA_SOURCE_AUTHENTICATING',
  name,
  value,
})

export const getOauthUrl = name => {
  const dataSourceService = dataSourceServices.find(
    dataSource => dataSource.name === name
  )
  return dispatch => {
    dispatch(setDataSourceAuthenticating(name, true))
    return dataSourceService
      .getOauthUrl()
      .then(url => url)
      .finally(() => dispatch(setDataSourceAuthenticating(name, false)))
  }
}

export const authenticateDataSource = (name, code) => {
  const dataSourceService = dataSourceServices.find(
    dataSource => dataSource.name === name
  )
  return dispatch => {
    dispatch(setDataSourceAuthenticating(name, true))
    return dataSourceService
      .authenticate({ code })
      .then(() => dispatch(setDataSourceConnected(name, true)))
      .finally(() => dispatch(setDataSourceAuthenticating(name, false)))
  }
}

export const disconnectDataSource = name => {
  const dataSourceService = dataSourceServices.find(
    dataSource => dataSource.name === name
  )
  return dispatch => {
    dispatch(setDataSourceAuthenticating(name, true))
    return dataSourceService
      .disconnect()
      .then(alert => {
        dispatch(setDataSourceConnected(name, false))
        return alert
      })
      .finally(() => dispatch(setDataSourceAuthenticating(name, false)))
  }
}

const defaultDataSources = dataSourceServices.map(config => ({
  ...config,
  isConnected: false,
  isAuthenticating: false,
}))

const dataSources = (state = defaultDataSources, action) => {
  switch (action.type) {
    case 'SET_DATA_SOURCE_CONNECTED':
      return state.map(
        dataSource =>
          dataSource.name === action.name
            ? { ...dataSource, isConnected: action.value }
            : dataSource
      )
    case 'SET_DATA_SOURCE_AUTHENTICATING':
      return state.map(
        dataSource =>
          dataSource.name === action.name
            ? { ...dataSource, isAuthenticating: action.value }
            : dataSource
      )
    default:
      return state
  }
}

export default dataSources
