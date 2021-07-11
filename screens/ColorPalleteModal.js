import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import Switcher from '../components/Switcher.js';

import { palletes } from '../Palletes.js';

const ColorPalleteModal = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedPalletes, setSelectedPalletes] = useState([]);

  const onSubmit = () => {
    if (!name) {
      setNameError('Field is empty');
      return;
    }

    if (selectedPalletes.length < 1) {
      Alert.alert('Warning!', 'You need to selected atleast 5 color palletes');
      return;
    }

    const pallete = {
      paletteName: name,
      colors: selectedPalletes,
    };

    navigation.navigate('Home', { newPalletes: pallete });
  };

  const onAddPallete = useCallback((pallete) => {
    setSelectedPalletes((prev) => [...prev, pallete]);
  }, []);

  const onRemovePallete = useCallback((pallete) => {
    const filteredPalletes = selectedPalletes.filter((x) => x !== pallete);

    setSelectedPalletes(filteredPalletes);
  }, []);

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        value={name}
      />
      <Text style={styles.error}>{nameError}</Text>
      <FlatList
        style={styles.list}
        data={palletes}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <Switcher
            item={item}
            onAddPallete={onAddPallete}
            onRemovePallete={onRemovePallete}
          />
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Button title="Submit" onPress={() => onSubmit()} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    flex: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  list: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 2,
  },
  button: {
    marginTop: 20,
  },
});

export default ColorPalleteModal;
