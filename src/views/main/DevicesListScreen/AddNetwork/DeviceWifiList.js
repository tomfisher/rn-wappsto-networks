import React from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import useDeviceScanWifi from '../../../../hooks/setup/blufi/useDeviceScanWifi';
import { useTranslation, CapitalizeFirst } from '../../../../translations';
import theme from '../../../../theme/themeExport';
import image from '../../../../theme/images';

const styles = StyleSheet.create({
  deviceItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.variables.cardBgColor,
    borderRadius: theme.variables.borderRadiusBase,
    borderWidth: theme.variables.borderWidth,
    borderColor: theme.variables.cardBorderColor,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  signalImageWrapper:{
    marginLeft:8,
    alignItems:'center'
  },
  signalImage:{
    width: 20,
    height: 20
  },
  spinner:{
    marginRight: 10
  },
  progressText:{
    flex:1
  },
  panel:{
    borderColor: '#ccc',
    borderWidth: 0.4,
    paddingVertical:50,
    paddingHorizontal:10
  },
  hiddenButtonWrapper:{
    marginTop:50
  }
});

const DeviceWifiList = React.memo(({ next, selectedDevice, wifiFields }) => {
  const { t } = useTranslation();
  const { loading, error, step, scan, result } = useDeviceScanWifi(selectedDevice);

  const selectSsid = (ssid) => {
    wifiFields.setSsid(ssid);
    next();
  };

  const signalQuality = (rssi) => {
    if (rssi >= -50){
      return image.onboarding.wifiSignalIcon.excellent;
    } else if (rssi < -50 && rssi >= -60){
      return image.onboarding.wifiSignalIcon.good;
    } else if (rssi < -60 && rssi >= -70){
      return image.onboarding.wifiSignalIcon.fair;
    }
    return image.onboarding.wifiSignalIcon.poor;
  };

  return (
    <>
      {loading &&
        <>
          <Text
            size='h3'
            content={CapitalizeFirst(t('onboarding.wifiScan.scanInProgress'))}
          />
          <Text
          size='p'
          content={CapitalizeFirst(t('onboarding.wifiScan.scanningInProgressInfo'))}
          />
          <View style={[theme.common.row, styles.panel]}>
            <ActivityIndicator size='small' color={theme.variables.spinnerColor} style={styles.spinner} />
            <Text
              style={styles.progressText}
              content={CapitalizeFirst(t('onboarding.progress.' + step))}
            />
          </View>
        </>
      }
      {!loading && error &&
        <>
          <Text
            size='h3'
            content={CapitalizeFirst(t('onboarding.wifiScan.error.title'))}
          />
          {
            image.onboarding.wifiSetupError &&
            <Image resizeMode='contain' source={image.onboarding.wifiSetupError} style={theme.common.image}/>
          }
          <Text
            color='error'
            content={CapitalizeFirst(t('onboarding.error.' + step))}
          />
        </>
      }
      {!loading && !error && result.length === 0 &&
        <Text
          size='p'
          align='center'
          content={CapitalizeFirst(t('onboarding.wifiScan.noWifiFound'))}
        />
      }
      {!loading && !error && result.length !== 0 &&
        <>
          <Text
            size='h3'
            content={CapitalizeFirst(t('onboarding.wifiScan.foundWifi'))}
          />
          <Text
            size='p'
            content={CapitalizeFirst(t('onboarding.wifiScan.selectWifi'))}
          />
          {result.map((wifi, index) => (
            <TouchableOpacity key={index} onPress={() => selectSsid(wifi.ssid)} style={styles.deviceItem}>
              <Text
                bold
                content={wifi.ssid}
              />
              {image.onboarding.wifiSignalIcon &&
                <View style={styles.signalImageWrapper}>
                  <Image
                    resizeMode='contain'
                    source={signalQuality(wifi.rssi)}
                    style={styles.signalImage}
                  />
                </View>
              }
            </TouchableOpacity>
          ))}
        </>
      }
      {!loading &&
        <Button
          onPress={scan}
          type='link'
          color='primary'
          text={CapitalizeFirst(t('onboarding.wifiScan.scanAgain'))}
        />
      }
      <View style={styles.hiddenButtonWrapper}>
        <Text
          size='p'
          align='center'
          color='secondary'
          content={CapitalizeFirst(t('onboarding.wifiScan.hiddenNetworkInfo'))}
        />
        <Button
          onPress={next}
          type='link'
          text={CapitalizeFirst(t('onboarding.wifiScan.manualSetup'))}
        />
      </View>
    </>
  );
});

export default DeviceWifiList;
