import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setDataSourceConnected } from '../store/dataSources';
import { loginUser, signupUser } from '../store/user';
import App from './component';
import userService from '../services/user';

const mapStateToProps = ({ dataSources }) => ({
    dataSourcesConnected: dataSources.reduce((previous, current) => previous || current.isConnected, false)
});

const mapDispatchToProps = dispatch => ({
  // TODO: if login fails then clear that user from localStorage and signup
  onMount: () => {
    const userId = userService.getCurrentUser();
    const action = userId ? () => loginUser(userId) : () => signupUser();
    return dispatch(action())
      .then(user => user.dataSources)
      .then(dataSources => dataSources.forEach(dataSource => dispatch(setDataSourceConnected(dataSource.name, dataSource.isConnected))))
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
