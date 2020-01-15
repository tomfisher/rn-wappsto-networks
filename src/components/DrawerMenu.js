import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import RequestError from './RequestError';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItem } from 'wappsto-redux/actions/items';
import { closeStream } from 'wappsto-redux/actions/stream';
import { removeSession } from 'wappsto-redux/actions/session';
import { getUserData } from 'wappsto-redux/selectors/entities';
import { getSession } from 'wappsto-redux/selectors/session';
import { makeItemSelector } from 'wappsto-redux/selectors/items';
import theme from '../theme/themeExport';
import Icon from 'react-native-vector-icons/Feather';
import useRequest from 'wappsto-blanket/hooks/useRequest';
import { config } from '../configureWappstoRedux';
import { userFetched } from '../util/params';
import i18n, { CapitalizeFirst } from '../translations';

const DrawerMenu = React.memo((props) => {
  const dispatch = useDispatch();
  const session = useSelector(getSession);
  const user = useSelector(getUserData);
  const { request, send } = useRequest();
  const { send: sendDelete } = useRequest();
  const getItem = useMemo(makeItemSelector, []);
  const fetched = useSelector(state => getItem(state, userFetched));

  const getUser = useCallback(() => {
    send({
      method: 'GET',
      url: '/user',
      query: {
        me: true,
        expand: 0
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fetched) {
      dispatch(setItem(userFetched, true));
      getUser();
    } else if (request && request.status === 'error') {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    if (config.stream) {
      dispatch(closeStream(config.stream.name));
    }
    sendDelete({ method: 'DELETE', url: '/session/' + session.meta.id });
    dispatch(removeSession());
    AsyncStorage.removeItem('session');
    props.navigation.navigate('LoginScreen');
  }

  let name = '';
  if (user) {
    if (user.nickname) {
      name = user.nickname;
    } else {
      if (user.first_name) {
        name += user.first_name + ' ';
      }
      if (user.last_name) {
        name += user.last_name;
      }

      if (!name) {
        if (user.provider[0] && user.provider[0].name) {
          name = user.provider[0].name;
        } else {
          name = user.email;
        }
      }
    }
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <View style={theme.common.userInfo}>
            {user && user.provider[0] ? (
              <Image
                style={theme.common.userImage}
                source={{uri: user.provider[0].picture}}
              />
            ) : request &&
              request.method === 'GET' &&
              request.status === 'pending' ? (
              <ActivityIndicator
                size='large'
                color={theme.variables.textInverse}
              />
            ) : (
              <Icon
                name='user'
                style={theme.common.spaceAround}
                size={20}
              />
            )}
            <Text>{name}</Text>
          <RequestError request={request} />
        </View>
        <DrawerNavigatorItems {...props} />

      </ScrollView>
      <TouchableOpacity
        style={theme.common.spaceAround}
        onPress={logout}>
        <Text style={theme.common.linkBtn}>
          {CapitalizeFirst(i18n.t('logout'))}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default DrawerMenu;
