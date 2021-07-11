import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ColorBox = ({ colorName, hex }) => {
  const backgroundColor = {
    backgroundColor: hex,
  };

  const textColor = {
    color:
      parseInt(hex.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white',
  };

  return (
    <View style={[styles.box1, backgroundColor]}>
      <Text style={[styles.boxText, textColor]}>
        {colorName} {hex}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ColorBox;
