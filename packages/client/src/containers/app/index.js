import { connect } from 'react-redux';
import { setFocussedItem, setFeeds } from '../../actions';
import App from '../../components/app';

const mapStateToProps = state => ({ 
  feeds: state.feeds,
  date: state.date,
  focussedItemId: state.focussedItemId
 });

const mapDispatchToProps = dispatch => ({
  setFocussedItem: id => dispatch(setFocussedItem(id)),
  setFeeds: feeds => dispatch(setFeeds(feeds))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);