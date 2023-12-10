import styled, { css } from 'styled-components';

import { ButtonPrimary, IconButton, Modal } from '@quoll/ui-components';

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Title = styled.div(
  ({ theme: { font } }) => css`
    text-align: center;
    font-family: ${`Pacifico, ${font.family}`};
    font-size: 48px;
  `
);

const Message = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0 30px;
`;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnect }: Props) => (
  <Modal isOpen={isOpen} onRequestClose={onCancel}>
    <Header>
      <IconButton icon="Close" size={30} onClick={onCancel} />
    </Header>
    <Title>Quoll</Title>
    <Message>Map ya life!</Message>
    <Actions>
      <ButtonPrimary onClick={onConnect}>Connect Feeds</ButtonPrimary>
    </Actions>
  </Modal>
);

export default WelcomeModal;
