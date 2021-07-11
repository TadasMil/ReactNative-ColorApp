import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const Switcher = ({ item, onAddPallete, onRemovePallete }) => {
  const [isSelected, setSelected] = useState(false);

  const onSelected = () => {
    if (!isSelected) {
      onAddPallete(item);
    }

    if (isSelected) {
      onRemovePallete(item);
    }

    setSelected((prev) => !prev);
  };

  return (
    <View style={styles.view}>
      <Text>{item.colorName}</Text>
      <Switch value={isSelected} onValueChange={onSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
});

export default Switcher;
