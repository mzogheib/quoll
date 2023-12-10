import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Icon, IconButton } from "@quoll/ui-components";

import { IconWrapper } from "../common";
import { routesHash } from "../../../routes";

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.mineShaft};
    min-width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
  `
);

const Title = styled.div(
  ({ theme: { colors, font } }) => css`
    color: ${colors.mediumAquamarine};
    flex-basis: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${`Pacifico, ${font.family}`};
    font-size: 26px;
    margin: 0 0 20px;
  `
);

const NavGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const NavPrimary = styled.nav`
  flex-grow: 1;
`;

const itemStyle = css`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 20px 0;
  padding: 5px;
`;

const StyledNavLink = styled(NavLink)(
  ({ theme: { colors } }) => css`
    ${itemStyle};

    &.active {
      padding: 5px 0 5px 5px;
      border-right: 5px solid ${colors.mediumAquamarine};
    }
  `
);

const Help = styled.div(() => itemStyle);

interface Props {
  onHelpClick: () => void;
}

const SideBarVertical = ({ onHelpClick }: Props) => (
  <Wrapper>
    <Title>Quoll</Title>
    <NavGroup>
      <NavPrimary>
        <StyledNavLink to={routesHash.home.path} exact activeClassName="active">
          <IconWrapper>
            <Icon icon="Map" />
          </IconWrapper>
        </StyledNavLink>
      </NavPrimary>
      <nav>
        <StyledNavLink to={routesHash.settings.path} activeClassName="active">
          <IconWrapper>
            <Icon icon="Settings" />
          </IconWrapper>
        </StyledNavLink>
      </nav>
    </NavGroup>
    <Help>
      <IconWrapper>
        <IconButton icon="Help" onClick={onHelpClick} />
      </IconWrapper>
    </Help>
  </Wrapper>
);

export default SideBarVertical;
