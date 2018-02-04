module.exports = {
  activities: { 
    list: list
  }
};

function list (parameters) {
  return Promise.resolve({ data: [] });
}
