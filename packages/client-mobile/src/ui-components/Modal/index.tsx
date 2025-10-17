import React, { ReactNode } from "react";
import { Modal as RNModal, View } from "react-native";

import styles from "./styles";

import { ModalInner } from "./ModalInner";
import { ModalHeader } from "./ModalHeader";
import { ModalActions } from "./ModalActions";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, children, onRequestClose }: Props) => (
  <RNModal
    transparent={true}
    visible={isOpen}
    onRequestClose={onRequestClose}
    supportedOrientations={["portrait", "landscape"]}
  >
    <View style={styles.overlay}>
      <View style={styles.base}>{children}</View>
    </View>
  </RNModal>
);

Modal.Inner = ModalInner;
Modal.Header = ModalHeader;
Modal.Actions = ModalActions;
