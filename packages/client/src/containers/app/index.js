import { connect } from 'react-redux';
import { setFeeds } from '../../actions';
import App from '../../components/app';

const mapStateToProps = state => ({ 
  feeds: state.feeds,
  date: state.date
 });

const mapDispatchToProps = dispatch => ({
  setFeeds: feeds => dispatch(setFeeds(feeds))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);