import React from 'react';
import { View, StatusBar, StyleSheet, Image } from 'react-native';
import SessionVerifier from './SessionVerifier';
import useStorageSession from '../hooks/useStorageSession';
import theme from '../theme/themeExport';
import defaultImages from '../theme/images';

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: theme.variables.appBgColor
  },
  image:{
    alignSelf: 'center',
    maxWidth: '100%'
  }
});

const SplashScreen = ({ navigation }) => {
  const { session, status } = useStorageSession();

  return (
    <View style={styles.splashScreenContainer}>
      <StatusBar backgroundColor={theme.variables.statusBarBgLight} barStyle={theme.variables.statusBarColorDark}/>
      {
        defaultImages.splashScreen.logo &&
        <Image resizeMode='contain' style={styles.image} source={defaultImages.splashScreen.logo} />
      }
      <SessionVerifier
        status={status}
        session={session}
        navigate={navigation.navigate}
      />
    </View>
  );
};

export default SplashScreen;
