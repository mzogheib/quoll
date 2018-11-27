import utils from '.'

it('adds query params to a url', () => {
  const params = { foo: 'bar', biz: 1234 }
  const url = 'http://www.example.com'
  const urlWithQueryParam = 'http://www.example.com?myParam=hello'
  let result

  result = utils.addQueryParams(url, params)
  expect(result).toEqual(`${url}?foo=bar&biz=1234`)

  result = utils.addQueryParams(urlWithQueryParam, params)
  expect(result).toEqual(`${urlWithQueryParam}&foo=bar&biz=1234`)

  result = utils.addQueryParams(urlWithQueryParam)
  expect(result).toEqual(urlWithQueryParam)

  result = utils.addQueryParams()
  expect(result).toBeUndefined()
})
