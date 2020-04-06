import color from 'color';
import {Platform, Dimensions, PixelRatio} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const isIphoneX =
  platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;

let variables = {};

export function generateVariables(v = {}) {
  Object.assign(variables, {
    // Color
    primary: 'hsla(169, 90%, 35%, 1)',
    secondary: 'hsla(17, 100%, 80%, 1)',

    get dark() {
      return color(this.primary).darken(0.5);
    },
    darkGray: '#666',
    lightGray: '#eee',
    white: '#ffffff',
    black: '#222',
    disabled: '#bbbbbb',
    inactive: '#fafafa',
    success: '#5cb85c',
    alert: '#c51165',
    warning: '#f0ad4e',

    get appBgColor() {
      return '#f4f4f3';
    },
    get modalBgColor() {
      return this.white;
    },
    get panelBgColor() {
      return this.white;
    },
    get splashScreenBgColor() {
      return this.white;
    },

    // Typography
    defaultFontSize: 14,
    fontFamily: 'System',
    fontSizeBase: 12,
    get h1() {
      return this.fontSizeBase + 22;
    },
    get h2() {
      return this.fontSizeBase + 18;
    },
    get h3() {
      return this.fontSizeBase + 14;
    },
    get h4() {
      return this.fontSizeBase + 10;
    },
    get h5() {
      return this.fontSizeBase + 6;
    },
    get h6() {
      return this.fontSizeBase + 2;
    },

    // Title
    get titleFontfamily() {
      return this.fontFamily;
    },

    // Text
    get textColor() {
      return this.black;
    },
    get textSuccess() {
      return this.success;
    },
    get textWarning() {
      return this.warning;
    },
    get textError() {
      return this.alert;
    },
    get textInverse() {
      return this.white;
    },
    get textImportant() {
      return this.alert;
    },
    get textSecondary() {
      return this.darkGray;
    },

    // Border
    borderRadiusBase: 5,
    get borderRadiusLarge() {
      return this.borderRadiusBase * 7;
    },
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(0.3),

    // Button
    get buttonBg() {
      return this.primary;
    },
    buttonColor: 'white',
    get buttonTextSize() {
      return this.fontSizeBase + 2;
    },

    // Icon
    iconSmall: 18,
    iconMedium: 28,
    iconLarge: 44,

    // Input
    get inputTextSize() {
      return this.fontSizeBase + 2;
    },
    get inputBorderColor() {
      return color(this.textColor);
    },
    inputBg: 'rgba(255, 255, 255, .8)',

    // Progress Bar
    get defaultProgressColor() {
      return this.primary;
    },
    get inverseProgressColor() {
      return this.secondary;
    },

    // Spinner
    get spinnerColor() {
      return this.dark;
    },
    get inverseSpinnerColor() {
      return this.white;
    },

    // Header
    get headerBgColor() {
      return this.primary;
    },

    ...v,
  });
  return variables;
}

generateVariables();

export default variables;
