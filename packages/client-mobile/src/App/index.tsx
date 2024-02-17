import React, { useState } from "react";
import { View } from "react-native";
import NavBar from "@components/NavBar";
import WelcomeModal from "@components/WelcomeModal";
import ScreenStack from "@screens/ScreenStack";
import { useNavigate } from "@screens/navigation";

import { useStyles } from "./styles";

function App() {
  const navigate = useNavigate();

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const openWelcomeModal = () => setIsWelcomeModalOpen(true);
  const closeWelcomeModal = () => setIsWelcomeModalOpen(false);

  const handleConnect = () => {
    closeWelcomeModal();
    navigate("settings");
  };

  const styles = useStyles();

  return (
    <>
      <View style={styles.wrapper}>
        <NavBar onHelpClick={openWelcomeModal} />
        <ScreenStack />
      </View>
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onCancel={closeWelcomeModal}
        onConnect={handleConnect}
      />
    </>
  );
}

export default App;
