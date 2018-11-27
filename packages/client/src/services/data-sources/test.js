import dataSources from '.'

dataSources.forEach(dataSource => {
  it('has a standard schema', () => {
    /* 
    {
      name: 'name',
      title: 'Display Name',
      link: {
        url: 'https://someurl.com',
        label: 'someurl.com',
      },
      imageConnected: require('../images/logo-196x196.png'),
      imageDisconnected: require('../images/logo-gray-196x196.png'),
      getOauthUrl: someFunction,
      authenticate: someFunction,
      disconnect: someFunction,
    }
    */

    expect(typeof dataSource.name).toBe('string')
    expect(typeof dataSource.title).toBe('string')
    expect(typeof dataSource.link).toBe('object')
    expect(typeof dataSource.link.url).toBe('string')
    expect(typeof dataSource.link.label).toBe('string')
    expect(typeof dataSource.imageConnected).toBe('string')
    expect(typeof dataSource.imageDisconnected).toBe('string')
    expect(typeof dataSource.getOauthUrl).toBe('function')
    expect(typeof dataSource.authenticate).toBe('function')
    expect(typeof dataSource.disconnect).toBe('function')
  })
})
