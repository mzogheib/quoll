const parseQueryParams = (searchString) => {
    const queryString = searchString && searchString.split('?') && searchString.split('?')[1];
    if (queryString) {
      const paramPairs = queryString.split('&');
      const params = {};
      paramPairs.forEach(paramPair => {
        params[paramPair.split('=')[0]] = paramPair.split('=')[1]
      });
      return params;
    } else {
        return;
    }
};

export default {
    parseQueryParams
};