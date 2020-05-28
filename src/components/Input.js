import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../theme/themeExport';

const styles = StyleSheet.create({
  inputWrapper: {
    width:'100%',
    marginBottom: theme.variables.defaultFontSize
  },
  input: {
    width: '100%',
    fontSize: theme.variables.inputTextSize,
    fontFamily: theme.variables.fontFamily,
    color: theme.variables.inputTextColor,
    marginVertical: 2,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: theme.variables.inputBg,
    borderColor: theme.variables.inputBorderColor,
    borderWidth: theme.variables.borderWidth,
    borderRadius: theme.variables.borderRadiusBase,
  },
  inputError: {
    borderColor: theme.variables.alert,
    color: theme.variables.alert
  },
  inputDisabled: {
    borderColor: theme.variables.disabled,
    color: theme.variables.disabled
  },
  validationError:{
    fontSize:theme.variables.fontSizeBase
  },
  passwordVisibilityButton: {
    position: 'absolute',
    lineHeight: Math.round(theme.variables.inputTextSize * 1.5),
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 16
  }
});

const Input = React.memo(({
  inputRef,
  label,
  style,
  value,
  disabled,
  showPassword,
  toggleShowPassword,
  validationError,
  ...props
}) => {

  return (
    <>
      {!!label &&
        <Text
          content={label}
          color={validationError ? 'error' : disabled ? 'disabled' : ''}
        />
      }
      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          ref={inputRef}
          style={[styles.input, validationError && styles.inputError, disabled && styles.inputDisabled, style]}
          selectionColor={theme.variables.inputSelectionColor}
          value={value}
          editable={!disabled}
          autoCorrect={false}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        {toggleShowPassword &&
          <Icon
            style={styles.passwordVisibilityButton}
            color={validationError ? theme.variables.alert : disabled ? theme.variables.disabled : theme.variables.inputTextColor}
            name={showPassword ? 'eye-slash' : 'eye'}
            onPress={toggleShowPassword}
            size={14}
          />
        }
        {!!validationError &&
          <Text
            color='error'
            content={validationError}
            style={styles.validationError}
          />
        }
      </View>
    </>
  );
});

export default Input;
