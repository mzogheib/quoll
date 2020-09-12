import feeds from '.'

feeds.forEach((feed) => {
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

    expect(typeof feed.name).toBe('string')
    expect(typeof feed.title).toBe('string')
    expect(typeof feed.link).toBe('object')
    expect(typeof feed.link.url).toBe('string')
    expect(typeof feed.link.label).toBe('string')
    expect(typeof feed.imageConnected).toBe('string')
    expect(typeof feed.imageDisconnected).toBe('string')
    expect(typeof feed.getOauthUrl).toBe('function')
    expect(typeof feed.authenticate).toBe('function')
    expect(typeof feed.disconnect).toBe('function')
  })
})
