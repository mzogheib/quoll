import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { useStyles } from "./styles";

import NavBar from "@components/NavBar";
import WelcomeModal from "@components/WelcomeModal";
import ScreenStack from "@screens/ScreenStack";
import { useNavigate } from "@screens/navigation";
import { useUserViewModel } from "@modules/user/view-model";

function App() {
  const navigate = useNavigate();

  const { getCurrentUserId, login, signup } = useUserViewModel();

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [didAuthenticate, setDidAuthenticate] = useState(false);

  useEffect(() => {
    if (didAuthenticate) return;

    const userId = getCurrentUserId();
    setDidAuthenticate(true);

    console.log("userId", userId);

    if (userId) login(userId);
    else signup();
  }, [didAuthenticate, getCurrentUserId, login, signup]);

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
