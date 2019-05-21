import React from 'react'
import Button from '../Button'
import './style.scss'

const PrimaryButton = ({ label, onClick }) => (
  <Button className="primary-button" label={label} onClick={onClick} />
)

export default PrimaryButton
