import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import Screen from '../../../components/Screen';
import List from '../../../components/List';
import Value from './Value';

import * as items from '../../../wappsto-redux/actions/items';
import {getEntity} from '../../../wappsto-redux/selectors/entities';

import theme from '../../../theme/themeExport';

function mapStateToProps(state) {
  return {
    selectedDevice: getEntity(state, 'device', state.items.selectedDevice),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(items, dispatch),
  };
}

class DeviceScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      ...theme.headerStyle,
      title: navigation.getParam('title', ''),
    };
  };

  componentWillUnmout() {
    this.props.removeItem('device');
  }

  render() {
    const device = this.props.selectedDevice;
    if(!device || !device.meta || !device.meta.id){
      this.props.navigation.goBack();
      return null;
    }
    return (
      <Screen>
        <List
          id={device.meta.id}
          type="device"
          childType="value"
          query={{expand: 5}}
          renderItem={({item}) => <Value item={item} />}
        />
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceScreen);
