import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default ({ isOpen, onRequestClose, children, maxWidth }) => {
  const customStyle = {
    overlay: {
      backgroundColor: 'rgba(196, 196, 196, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Content will grow as large as the children
    content: {
      background: 'transparent',
      top: 'unset',
      right: 'unset',
      bottom: 'unset',
      left: 'unset',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      overflow: 'unset',
      width: '100%',
      maxWidth,
    },
  }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        console.log('onRequestClose')
        onRequestClose()
      }}
      shouldCloseOnOverlayClick
      style={customStyle}
    >
      {children}
    </ReactModal>
  )
}
