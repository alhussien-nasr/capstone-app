import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppText = ({children, style, ...rest}) => {
  return (
    <Text  style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    color: 'rgb(33,37,80)'
    , fontSize: 18},
});
