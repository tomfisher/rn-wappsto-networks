import React, { useState, useCallback, useEffect } from 'react';
import PopupButton from 'src/components/PopupButton';
import { Modal } from 'react-native';
import theme from 'src/theme/themeExport';
import SelectChoice from './SelectChoice';
import SearchBlufi from './SearchBlufi';
import ConfigureWifi from './ConfigureWifi';
import SetupDevice from './SetupDevice';
import AddNetworkPopup from './AddNetworkPopup';
import useVisible from 'wappsto-blanket/hooks/useVisible';
import { iotNetworkListAdd } from 'src/util/params';
import Popup from 'src/components/Popup';
import ConfirmAddManufacturerNetwork from './ConfirmAddManufacturerNetwork';
import BackHandlerView from './BackHandlerView';
import useAddNetworkAsManufacturer from 'src/hooks/useAddNetworkAsManufacturer';

const Content = React.memo(({ visible, hide, show }) => {
  const [ ssid, setSsid ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ selectedDevice, setSelectedDevice ] = useState();
  const [ maoVisible, maoShow, maoHide ] = useVisible(false);
  const [ step, setStep ] = useState(0);
  const {
    setAcceptedManufacturerAsOwner,
    sendRequest,
    request,
    acceptManufacturerAsOwner,
    refuseManufacturerAsOwner,
    acceptedManufacturerAsOwner,
    skipErrorCodes
  } = useAddNetworkAsManufacturer(iotNetworkListAdd, maoShow, maoHide);

  const next = useCallback(() => {
    setStep(s => {
      if(s === 3){
        setAcceptedManufacturerAsOwner(null);
      }
      return s + 1;
    });
  }, [setAcceptedManufacturerAsOwner]);

  const handleBack = useCallback(() => {
    if (step) {
      setStep(n => n === 2 ? 0 : n - 1);
    } else {
      hide();
    }
  }, [step, setStep, hide]);

  useEffect(() => {
    if(!visible){
      setStep(0);
      setAcceptedManufacturerAsOwner(null);
    }
  }, [visible, setAcceptedManufacturerAsOwner]);

  let Step = null;
  switch (step) {
    case 0:
      Step = SelectChoice;
      break;
    case 1:
      Step = AddNetworkPopup;
      break;
    case 2:
      Step = SearchBlufi;
      break;
    case 3:
      Step = ConfigureWifi;
      break;
    case 4:
      Step = SetupDevice;
      break;
    default:
      Step = null;
      break;
  }

  return (
    <>
      <Popup visible={maoVisible} onRequestClose={refuseManufacturerAsOwner} hide={refuseManufacturerAsOwner} hideCloseIcon>
        <ConfirmAddManufacturerNetwork
          accept={acceptManufacturerAsOwner}
          reject={refuseManufacturerAsOwner}
        />
      </Popup>
      <Modal
        transparent={true}
        visible={visible}
        hide={hide}
        onRequestClose={handleBack}>
          <BackHandlerView hide={hide} handleBack={handleBack}>
            <Step
              hide={hide}
              next={next}
              setStep={setStep}
              selectedDevice={selectedDevice}
              setSelectedDevice={setSelectedDevice}
              ssid={ssid}
              setSsid={setSsid}
              password={password}
              setPassword={setPassword}
              sendRequest={sendRequest}
              postRequest={request}
              skipCodes={skipErrorCodes}
              acceptedManufacturerAsOwner={acceptedManufacturerAsOwner}
              />
          </BackHandlerView>
      </Modal>
    </>
  );
});

const AddNetwork = React.memo(() => {
  return (
    <PopupButton icon='plus-circle' color={theme.variables.white}>
      {(visible, hide, show) => <Content visible={visible} hide={hide} show={show} />}
    </PopupButton>
  );
});

export default AddNetwork;
