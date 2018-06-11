export const setDate = date => ({
  type: 'SET_DATE',
  date
});

const today = new Date();
const todayComponents = today.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
const todayString = `${todayComponents[2]}-${todayComponents[1]}-${todayComponents[0]}`

const date = (state = todayString, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.date
    default:
      return state
  }
};

export default date;
