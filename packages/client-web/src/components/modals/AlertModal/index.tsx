import { ButtonPrimary, Modal } from "@quoll/ui-components";

interface Props {
  message: string | null;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: Props) => (
  <Modal isOpen={message !== null} onRequestClose={onClose}>
    <Modal.Inner>
      <div>{message}</div>
      <Modal.Actions>
        <ButtonPrimary onClick={onClose}>OK</ButtonPrimary>
      </Modal.Actions>
    </Modal.Inner>
  </Modal>
);

export default AlertModal;
