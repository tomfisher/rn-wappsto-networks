import { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const wifiSsidStorageKey = 'wifiSSID';
const wifiPasswordStorageKey = 'wifiPassword';
const useConfigureWifi = (ssid, setSsid, password, setPassword) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const passwordInputRef = useRef();

  const save = useCallback(() => {
    AsyncStorage.setItem(wifiSsidStorageKey, ssid);
    AsyncStorage.setItem(wifiPasswordStorageKey, password);
    setShowPassword(false);
  }, [ssid, password]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(sp => !sp);
  }, []);

  const moveToPasswordField = useCallback(() => {
    const trimText = ssid.trim();
    if (trimText !== ssid) {
      setSsid(trimText);
    }
    passwordInputRef.current.focus();
  }, [ssid, setSsid]);

  const handleTextChange = useCallback((text, type) => {
    let currentText;
    let set;
    if(type === 'ssid'){
      currentText = ssid;
      set = setSsid;
    } else {
      currentText = password;
      set = setPassword;
    }
    if (text.length - currentText.length === 1) {
      set(text);
    } else {
      set(text.trim());
    }
  }, [ssid, password, setSsid, setPassword]);

  const init = async () => {
    try {
      const savedSsid = await AsyncStorage.getItem(wifiSsidStorageKey);
      if(!ssid){
        setSsid(savedSsid);
      }

      const passwords = await AsyncStorage.getItem(wifiPasswordStorageKey);
      if(passwords[ssid]){
        setPassword(passwords[ssid]);
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { save, showPassword, toggleShowPassword, handleTextChange, passwordInputRef, moveToPasswordField };
}

export default useConfigureWifi;
