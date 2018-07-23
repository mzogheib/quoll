import React from 'react';
import './style.css';
import Loader from '../horizontal-loader';

function DataSourceSettings(props) {

  function handleButtonClick(dataSource) {
    if (dataSource.isAuthenticating) {
      return;
    } else {
      return dataSource.isConnected ? props.onDisconnect() : props.onConnect();
    }
  }

  function renderButton(dataSource) {
    return (
      <a className={dataSource.isAuthenticating ? 'data-source-settings__connect-disabled' : 'data-source-settings__connect'} onClick={() => handleButtonClick(dataSource)}>
        {dataSource.isConnected ? 'Disconnect' : 'Connect'}
      </a>
    )
  }

  function render(dataSource) {
    const imgStyle = !dataSource.isConnected ? { filter: 'grayscale(100%)' } : {};
    return (
      <div className='data-source-settings'>
        <div className='data-source-settings__logo'>
          <img src={dataSource.image} alt='data source logo' style={imgStyle} />
        </div>
        <div className='data-source-settings__info'>
          <div className='data-source-settings__name'>{dataSource.title}</div>
          <a className='data-source-settings__url' href={dataSource.link.url} target='_blank'>{dataSource.link.label}</a>
        </div>
        <div>{renderButton(dataSource)}</div>
        {dataSource.isAuthenticating && (<div className='data-source-settings__loader'><Loader/></div>)}
      </div>
    )
  }

  return render(props.dataSource);
}

export default DataSourceSettings;
