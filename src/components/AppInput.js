import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const AppInput = ({style, placeholder, name, ...rest}) => {
  return (
    <View style={[styles.container, style]}>
      {name && (
        <Icon style={styles.icon} name={name} size={25} color={'gray'} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize={false}
        autoFocus={false}
        keyboardType="default"
        clearTextOnFocus={false}
        multiline={false}
        value
        {...rest}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: 50,
    backgroundColor: 'rgb(221	,221,	221	)',
    borderRadius: 20,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.3,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
  },
  input: {
    flex: 1,
    borderRadius: 30,
    paddingLeft: 50,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
  },
  icon: {position: 'absolute', left: 20},
});
