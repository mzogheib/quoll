import { connect } from 'react-redux';
import Settings from './component';
import { getOauthUrl, authenticateDataSource, disconnectDataSource } from '../../store/dataSources';

const mapStateToProps = state => ({
  dataSources: state.dataSources
});

const mapDispatchToProps = dispatch => ({
  onConnect: name => dispatch(getOauthUrl(name)),
  onOauthCodeReceived: (name, code) => dispatch(authenticateDataSource(name, code)),
  onDisconnect: name => dispatch(disconnectDataSource(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);