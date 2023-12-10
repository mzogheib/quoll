import { Fragment } from 'react';
import styled, { css } from 'styled-components';

import SideBarVertical from './SideBarVertical';
import SideBarHorizontal from './SideBarHorizontal';

const WrapperV = styled.div(
  ({ theme: { media } }) => css`
    ${media.breakpointDown(media.md)`
      display: none;
    `};
  `
);

const WrapperH = styled.div(
  ({ theme: { media } }) => css`
    ${media.breakpointUp(media.md)`
      display: none;
    `};
  `
);

interface Props {
  onHelpClick: () => void;
}

const SideBar = ({ onHelpClick }: Props) => (
  <Fragment>
    <WrapperV>
      <SideBarVertical onHelpClick={onHelpClick} />
    </WrapperV>
    <WrapperH>
      <SideBarHorizontal onHelpClick={onHelpClick} />
    </WrapperH>
  </Fragment>
);

export default SideBar;
