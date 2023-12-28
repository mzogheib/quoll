import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useStyles } from "./styles";

import NavBar from "./NavBar";
import Screens from "../screens/Screens";
import WelcomeModal from "../WelcomeModal";

function App() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const openWelcomeModal = () => setIsWelcomeModalOpen(true);
  const closeWelcomeModal = () => setIsWelcomeModalOpen(false);

  const handleConnect = () => {
    console.log("connect");
    closeWelcomeModal();
  };

  const styles = useStyles();

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <View style={styles.navContent}>
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
