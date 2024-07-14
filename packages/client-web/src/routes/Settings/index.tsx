import { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { FeedName } from "@quoll/lib";

import { useFeedsViewModel } from "modules/feeds/view-model";
import FeedSettings from "components/FeedSettings";
import AlertModal from "components/modals/AlertModal";
import { requestAuth } from "../../services/oauth";
import { SettingsLocationState } from "../types";
import TokenModal from "./TokenModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
`;

const Feeds = styled.div`
  width: 100%;
  max-width: 600px;
`;

const FeedsTitle = styled.div`
  font-weight: bold;
  font-size: 28px;
`;

const FeedsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedSettingsWrapper = styled.div`
  margin: 40px 0 0;
`;

const INITIAL_STATE = {
  showModal: false,
  modalMessage: "Oops, something went wrong.",
};

const Settings = () => {
  const history = useHistory();
  const location = useLocation<SettingsLocationState>();

  const [state, setState] = useState(INITIAL_STATE);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const { feeds, connect, disconnect, authenticate } = useFeedsViewModel();

  const openModal = (message = INITIAL_STATE.modalMessage) =>
    setState({ showModal: true, modalMessage: message });

  useEffect(() => {
    const { state: locationState } = location;
    if (locationState && locationState.errorMessage) {
      openModal(locationState.errorMessage);
      // Replace the current location without a state so that this error
      // message doesn't keep getting displayed
      history.replace("/settings");
    }
  }, [history, location]);

  const closeModal = () => setState({ ...INITIAL_STATE });

  const openTokenModal = () => setIsTokenModalOpen(true);
  const closeTokenModal = () => setIsTokenModalOpen(false);

  const handleSubmitToken = (value: string) => {
    // TODO submit somewhere
    closeTokenModal();
  };

  const handleConnect = async (name: FeedName) => {
    const defaultErrorMessage = "Could not connect feed. Please try again.";
    const openErrorModal = (message = defaultErrorMessage) =>
      openModal(message);

    const onRequestAuthSuccess = (code: string) =>
      authenticate(name, code).catch(openErrorModal);

    try {
      const config = await connect(name);

      if (config.type === "oauth") {
        const { url } = config.data;
        requestAuth(url, onRequestAuthSuccess, openErrorModal);
        return;
      }

      if (config.type === "personal-token") {
        openTokenModal();
        return;
      }
    } catch (error) {
      const message = typeof error === "string" ? error : defaultErrorMessage;
      openErrorModal(message);
    }
  };

  const handleDisconnect = (name: FeedName) =>
    disconnect(name).catch(() =>
      openModal("Could not disconnect feed. Please try again."),
    );

  const { showModal, modalMessage } = state;

  return (
    <Wrapper>
      <Feeds>
        <FeedsTitle>Feeds</FeedsTitle>
        <FeedsList>
          {feeds.map((feed) => (
            <FeedSettingsWrapper key={feed.name}>
              <FeedSettings
                feed={feed}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            </FeedSettingsWrapper>
          ))}
        </FeedsList>
      </Feeds>
      <AlertModal
        isOpen={showModal}
        message={modalMessage}
        onClose={closeModal}
      />
      <TokenModal
        isOpen={isTokenModalOpen}
        onCancel={closeTokenModal}
        onSubmit={handleSubmitToken}
      />
    </Wrapper>
  );
};

export default Settings;
