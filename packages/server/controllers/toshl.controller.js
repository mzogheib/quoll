const apiToshl = require('../vendor-apis/toshl');

module.exports = {
  getEntries
};

function getEntries (parameters) {
  return apiToshl.entries.list(parameters);
}