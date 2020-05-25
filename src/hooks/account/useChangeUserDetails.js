import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import useRequest from 'wappsto-blanket/hooks/useRequest';
import useConnected from '../useConnected';
import useUser from '../useUser';
import { NavigationContext } from 'react-navigation';
import { isEmail } from '../../util/helpers';

const useChangeUserDetails = () => {
  const navigation = useContext(NavigationContext);
  const { user } = useUser();
  const [ firstname, setFirstname ] = useState((user && user.first_name) || '');
  const [ lastname, setLastname ] = useState((user && user.last_name) || '');
  const [ nickname, setNickname ] = useState((user && user.nickname) || '');
  const [ email, setEmail ] = useState((user && user.email) || '');
  const [ phone, setPhone ] = useState((user && user.phone) || '');
  const [ successVisible, setSuccessVisible ] = useState(false);
  const [ emailBlurred, setEmailBlurred ] = useState(false);

  const lastnameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const connected = useConnected();
  const { send, request } = useRequest();
  const userId = user && user.meta && user.meta.id;

  const emailError = emailBlurred && email && !isEmail(email);
  const loading =  request && request.status === 'pending';
  const canUpdate = connected && !loading && isEmail(email);

  const moveToField = useCallback((field) => {
    if(field && field.current && field.current.focus){
      field.current.focus();
    }
  }, []);

  const hideSuccessPopup = useCallback(() => {
    setSuccessVisible(false);
    navigation.goBack();
  }, [navigation]);

  const update = useCallback(() => {
    if(canUpdate){
      send({
        method: 'PATCH',
        url: `/user/${userId}`,
        body: {
          first_name: firstname,
          last_name: lastname,
          nickname,
          email,
          phone
        }
      });
    }
  }, [canUpdate, send, firstname, lastname, nickname, email, phone, userId]);

  const onEmailBlur = useCallback(() => { setEmailBlurred(true) }, []);

  useEffect(() => {
    if(request){
      if(request.status === 'success'){
        setSuccessVisible(true);
      }
    }
  }, [request]);

  return {
    firstname,
    lastname,
    nickname,
    email,
    phone,
    setFirstname,
    setLastname,
    setNickname,
    setEmail,
    setPhone,
    lastnameRef,
    nicknameRef,
    emailRef,
    phoneRef,
    onEmailBlur,
    emailError,
    moveToField,
    canUpdate,
    update,
    request,
    loading,
    successVisible,
    hideSuccessPopup
  }
}

export default useChangeUserDetails;
