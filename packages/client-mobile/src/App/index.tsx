import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

import NavBar from "./NavBar";
import Screens from "../screens/Screens";
import { useIsNarrow } from "../dimensions";
import WelcomeModal from "../WelcomeModal";

function App() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const openWelcomeModal = () => setIsWelcomeModalOpen(true);
  const closeWelcomeModal = () => setIsWelcomeModalOpen(false);

  const handleConnect = () => {
    console.log("connect");
    closeWelcomeModal();
  };

  const isNarrow = useIsNarrow();

  const wrapperStyles = isNarrow
    ? styles.navContentNarrow
    : styles.navContentWide;

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <View style={wrapperStyles}>
          <NavBar onHelpClick={openWelcomeModal} />
          <Screens />
        </View>
      </NavigationContainer>
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onCancel={closeWelcomeModal}
        onConnect={handleConnect}
      />
    </SafeAreaView>
  );
}

export default App;
