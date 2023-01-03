import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('window').width;

const AppButton = ({style, onPress, textStyle, title, name, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.container, style]}>
      {name && <Icon name={name} size={20} color="white" />}
      <AppText style={[styles.text, textStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(39	,73	,220	)',
    width: width * 0.8,
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.3,
    shadowColor: 'rgb(39	,73	,220	)',
    shadowRadius: 1,
    elevation: 3,
  },
  text: {fontSize: 16, fontWeight: '700', marginLeft: 20, color: 'white'},
});
