import React, { PureComponent, Fragment } from 'react';
import {
  View,
  Text
} from 'react-native';

import PopupButton from './PopupButton';
import Popup from './Popup';
import theme from '../theme/themeExport';
import i18n, {CapitalizeFirst, CapitalizeEach} from '../translations/i18n';

export default class ValueSettings extends PureComponent {
  getValueType(value){
    if(value){
      if(value.hasOwnProperty('blob')){
        return {
          view: (
            <View>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.encoding'))}: {value.blob.encoding}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.maxLength'))}: {value.blob.max}</Text>
            </View>
          ),
          text: 'blob'
        };
      } else if(value.hasOwnProperty('number')){
        return {
          view: (
            <View>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.min'))}: {value.number.min}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.max'))}: {value.number.max}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.stepSize'))}: {value.number.step}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.unit'))}: {value.number.unit}</Text>
            </View>
          ),
          text: 'number'
        };
      } else if(value.hasOwnProperty('string')){
        return {
          view: (
            <View>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.encoding'))}: {value.string.encoding}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.maxLength'))}: {value.string.max}</Text>
            </View>
          ),
          text: 'string'
        };
      } else if(value.hasOwnProperty('xml')){
        return {
          view: (
            <View>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.xsd'))}: {value.xml.xsd}</Text>
              <Text>{CapitalizeFirst(i18n.t('valueDescription.namespace'))}: {value.xml.namespace}</Text>
            </View>
          ),
          text: 'xml'
        };
      }
    }
    return {view: null, text: ''};
  }

  content = (visible, hide) => {
    const { item } = this.props;
    const valueDataType = this.getValueType(item);
    return(
      <Popup visible={visible} onRequestClose={hide} hide={hide}>
        <Text style={theme.common.H5}>{CapitalizeEach(i18n.t('valueInfoHeader'))}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.name'))}: {item.name}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.uuid'))}: {item.meta.id}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.type'))}: {item.type}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.permission'))}: {item.permission}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.status'))}: {item.status}</Text>
        <Text>{CapitalizeFirst(i18n.t('valueDescription.dataType'))}: {valueDataType.text}</Text>
        {valueDataType.view}
      </Popup>
    );
  }

  render() {
    return (
      <PopupButton icon='more-vertical'>
        {this.content}
      </PopupButton>
    );
  }
}
