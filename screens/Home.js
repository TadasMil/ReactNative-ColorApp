import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const newPallete = route.params ? route.params.newPalletes : undefined;

  const [colors, setColors] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchColors = useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );

    if (response.ok) {
      const palettes = await response.json();
      setColors(palettes);
    }
  }, []);

  useEffect(() => {
    console.log(route);
    fetchColors();
  }, []);

  useEffect(() => {
    if (newPallete) {
      setColors([newPallete, ...colors]);
    }
  }, [newPallete]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchColors();
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      style={styles.list}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      data={colors}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() =>
            navigation.navigate('ColorPalette', {
              paletteName: item.paletteName,
              colors: item.colors,
            })
          }
          palette={item}
        />
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPalleteModal');
          }}
        >
          <Text style={styles.text}>Add Color Pallete</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
});

export default Home;
