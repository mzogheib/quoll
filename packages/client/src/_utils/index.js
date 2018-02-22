export default {
    parseQueryParams,
    extractTimeString
};

function parseQueryParams (searchString) {
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


// This will extract the first found match regardless of what else is in the input.
const TIME_FORMAT_REGEX = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;
function extractTimeString (input) {
    const match = input.match(TIME_FORMAT_REGEX);
    var isValid;
    if (match && match.length) {
      const timeElements = match[0].split(':');
      const hour = parseInt(timeElements[0], 10);
      const minute = parseInt(timeElements[1], 10);
      const second = parseInt(timeElements[2], 10);
      isValid = (hour >= 0 && hour < 24) && (minute >= 0 && minute < 60) && (second >= 0 && second < 60);
    }

    return isValid ? match[0] : null;
}
