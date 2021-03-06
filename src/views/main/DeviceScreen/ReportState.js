import React from 'react';
import { View, Text as RNtext, StyleSheet, Image } from 'react-native';
import Text from '../../../components/Text';
import theme from '../../../theme/themeExport';
import { useTranslation, CapitalizeFirst } from '../../../translations';
import Timestamp from './Timestamp';
import { cannotAccessState } from 'wappsto-blanket/util';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  data: {
    fontSize: theme.variables.h3,
    fontWeight: '400',
  },
  text:{
    textAlign: 'center',
    marginBottom: 15
  },
  textMargin:{
    marginBottom:20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const content = (state, value) => {
  if (value.hasOwnProperty('blob') && value.type === 'image') {
    if (state.data && state.data.length > 0) {
      return <Image style={styles.image} source={{uri: state.data}} />;
    } else {
      return null;
    }
  } else {
    return (
      <RNtext style={styles.text}>
        <Text
          style={styles.data}
          content={state.data}
        />
        <Text
          color='secondary'
          content={value.number && value.number.unit && ' ' + value.number.unit}
        />
      </RNtext>
    );
  }
};

const ReportState = React.memo(({ state, value }) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.row}>
        <Text bold color='secondary' style={styles.textMargin} content={CapitalizeFirst(t('currentState'))}/>
        {!cannotAccessState(state) &&
          <Timestamp timestamp={state.timestamp}/>
        }
      </View>
      {
        cannotAccessState(state) ? (
          <Text content={CapitalizeFirst(t('cannotAccess.' + state.status_payment))} />
        ) : (
          content(state, value)
        )
      }

    </View>
  );
});

export default ReportState;
