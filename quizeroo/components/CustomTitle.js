import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from 'react-native';

const CustomTitle = ({value, setValue, placeholder, placeholderTextColor}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001a23',
    width: '80%',
    alignSelf: 'center',
    height: 80,
    textAlign: 'center',

    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#e8f1f2',

    paddingHorizontal: 12,
    marginVertical: 3,
  },
  input: {
    color: '#E6D254',
    height: 70,
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
  },
});
export default CustomTitle;
