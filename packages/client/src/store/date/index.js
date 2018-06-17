import moment from 'moment';
export const setDate = date => ({
  type: 'SET_DATE',
  date
});

const date = (state = moment().format('YYYY-MM-DD'), action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.date
    default:
      return state
  }
};

export default date;
