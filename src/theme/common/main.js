import React from 'react';
import color from 'color';
import {StyleSheet} from 'react-native';
import {Platform, Dimensions} from 'react-native';

import {TextInput} from 'react-native';

let variables = require('./../variables/generic').default;
let styles = {};

TextInput.defaultProps.selectionColor = variables.darkGray;

export function generateStyles(c = {}) {
  Object.assign(
    styles,
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: variables.appBgColor
      },
      splashScreenContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: variables.splashScreenBgColor,
      },
      infoText: {
        paddingTop: 5,
        paddingBottom: 20,
        textAlign: 'center'
      },
      error: {
        borderColor: variables.alert,
        color: variables.alert,
      },
      warning: {
        borderColor: variables.warning,
        color: variables.warning,
      },
      success: {
        borderColor: variables.success,
        color: variables.success,
      },
      secondary: {
        borderColor: variables.textSecondary,
        color: variables.textSecondary,
      },
      errorPanel: {
        backgroundColor: variables.alert,
        color: variables.white,
      },
      warningPanel: {
        backgroundColor: variables.warning,
        color: variables.white,
      },
      successPanel: {
        backgroundColor: variables.success,
        color: variables.white,
      },
      toastFullWidth: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '100%',
      },
      btnGroup: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'space-between'
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      card: {
        backgroundColor: variables.white,
        borderRadius: variables.borderRadiusBase,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 25,
      },

      H1: {
        fontSize: variables.h1,
        lineHeight: variables.h1 * 1.5,
        marginBottom: variables.h1
      },
      H2: {
        fontSize: variables.h2,
        lineHeight: variables.h2 * 1.5,
        marginBottom: variables.h2
      },
      H3: {
        fontSize: variables.h3,
        lineHeight: variables.h3 * 1.5,
        marginBottom: variables.h3
      },
      H4: {
        fontSize: variables.h4,
        lineHeight: variables.h4 * 1.5,
        marginBottom: variables.h4
      },
      H5: {
        fontSize: variables.h5,
        lineHeight: variables.h5 * 1.5,
        marginBottom: variables.h5
      },
      H6: {
        fontSize: variables.h6,
        lineHeight: variables.h6 * 1.5,
        marginBottom: variables.h6
      },
      p: {
        fontSize: variables.defaultFontSize,
        lineHeight: variables.defaultFontSize * 1.5,
        marginBottom: variables.defaultFontSize * 1.5
      },
      p2: {
        fontSize: variables.defaultFontSize,
      },
      spaceAround: {
        padding: 15,
      },
      spaceBottom: {
        marginBottom: 15,
      },
      spaceLeft: {
        marginLeft: 15,
      },
      image:{
        alignSelf:'center',
        marginTop: 20,
        marginBottom:40
      },
      listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1,
        marginHorizontal: 10,
        padding: 8,
        borderRadius: variables.borderRadiusBase,
        backgroundColor: variables.white,
      },
      listItemTitleArea: {
        flex: 1,
      },
      iconButton: {
        paddingRight: 14,
        paddingLeft: 14
      },
      listItemHeader: {
        fontSize: variables.h5,
        color: variables.primary
      },
      listItemSubheader: {
        fontSize: variables.defaultFontSize - 1,
        color: variables.textSecondary
      },
      contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20
      },
      label: {
        fontSize: variables.defaultFontSize,
        lineHeight: variables.defaultFontSize * 1.5,
        color: variables.textColor
      },
      input: {
        width: '100%',
        height: variables.inputTextSize * 1.5 + 26,
        color: variables.textColor,
        fontSize: variables.inputTextSize,
        lineHeight: variables.inputTextSize * 1.5,
        marginBottom: variables.defaultFontSize,
        paddingHorizontal: 10,
        backgroundColor: variables.inputBg,
        borderColor: variables.inputBorderColor,
        borderWidth: variables.borderWidth,
        borderRadius: variables.borderRadiusBase
      },
      inputValidationError: {
        color: variables.alert,
        marginTop: -(variables.defaultFontSize * 0.8),
        marginBottom: variables.defaultFontSize
      },
      buttonText: {
        fontSize: variables.buttonTextSize,
        color: variables.buttonColor
      },
      button: {
        height: variables.buttonTextSize * 1.5 + 30,
        marginVertical: 20,
        padding: 15,
        alignItems: 'center',
        backgroundColor: variables.buttonBg,
        borderRadius: variables.borderRadiusBase
      },
      buttonOutlined: {
        backgroundColor: 'transparent',
        borderColor: variables.buttonBg,
        borderWidth: variables.borderWidth
      },
      buttonAlert: {
        backgroundColor: variables.alert
      },
      buttonAlertOutlined: {
        color: variables.alert,
        borderColor: variables.alert
      },
      primaryColor:{
        color: variables.primary
      },
      ghost: {
        backgroundColor: 'transparent'
      },
      actionText: {
        color: variables.primary,
        textDecorationLine: 'underline',
      },
      disabled: {
        backgroundColor: variables.disabled,
      },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: variables.modalBgColor,
      },
      popupOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      popupContent: {
        backgroundColor: variables.modalBgColor,
        margin: 20,
        padding: 20,
      },
      fullScreenModalContent: {
        padding: 20,
        flex:2
      },
      passwordVisibilityButton: {
        position: 'absolute',
        right: 0,
        padding: 16,
      },
      seperator: {
        marginVertical: 20,
        borderBottomColor: variables.lightGray,
        borderBottomWidth: variables.borderWidth,
      },
      itemPanel: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: variables.panelBgColor,
        borderRadius: variables.borderRadiusBase,
      },
      itemContent: {
        padding: 15,
      },
      itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomColor: variables.lightGray,
        borderBottomWidth: variables.borderWidth,
      },
      timestamp: {
        color: variables.darkGray,
        fontStyle: 'italic',
      },
      listHeader: {
        backgroundColor: variables.containerBgColor,
        color: variables.textSecondary,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10
      },
      listFooter:{
        marginBottom:20
      },
      userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: variables.lightGray,
        borderBottomWidth: variables.borderWidth
      },
      userImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        margin: 8,
      },
      linkBtn: {
        fontWeight: '600',
        padding: 16
      },
      ...c,
    }),
  );
  return styles;
}

generateStyles();

export default styles;
