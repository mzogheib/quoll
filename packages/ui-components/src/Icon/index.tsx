import React from 'react'
import { IconBaseProps } from 'react-icons/lib'
import {
  MdClose as Close,
  MdHelp as Help,
  MdMap as Map,
  MdNavigateNext as Next,
  MdNavigateBefore as Previous,
  MdSettings as Settings,
} from 'react-icons/md'

const icons = {
  Close,
  Help,
  Map,
  Next,
  Previous,
  Settings,
}

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

type OwnProps = {
  icon: IconName
}

type Props = OwnProps & IconBaseProps

const Icon = ({ icon, size = 40 }: Props) => {
  const Comp = icons[icon]

  return <Comp size={size} />
}

export default Icon
