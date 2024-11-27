import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pelis = ({ navigation }) => {
  const [pelis, setPelis] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Filtrar');

  const buscarPelis = pelis.filter(peli =>
    peli.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFilterChange = (itemValue) => {
    setSelectedFilter(itemValue);
  };

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(res => res.json())
      .then(data => setPelis(data))
      .catch(err => console.log(err));
  }, []);

  const navigateToFavorites = async () => {
    const favoritos = await AsyncStorage.getItem('favoritos');
    const favoritosArray = favoritos ? JSON.parse(favoritos) : [];
    navigation.navigate('Favoritos', { favoritos: favoritosArray });
  };

  return (
    <ScrollView style={styles.container}>
      <View>

        <View style={styles.centeredContainer}>

          <Text style={styles.title}>NEFLI</Text>

          <TextInput
            style={styles.input}
            placeholder="Buscar series..."
            placeholderTextColor="#777"
            onChangeText={setSearch}
            value={search}
          />

          <TouchableOpacity style={styles.button} onPress={navigateToFavorites}>
            <Text style={styles.buttonText}>Ver mis Favoritos</Text>
          </TouchableOpacity>

          <Picker
            style={styles.picker}
            selectedValue={selectedFilter}
            onValueChange={handleFilterChange}>
            <Picker.Item label="Filtrar por:" value="Filtrar" enabled={false} />
            <Picker.Item label="Genero" value="Genero" />
            <Picker.Item label="Año" value="Año" />
            <Picker.Item label="Duracion" value="Duracion" />
            <Picker.Item label="Puntuacion" value="Puntuacion" />
          </Picker>

        </View>

        <View style={styles.gridContainer}>
          {buscarPelis.map(peli => (
            <TouchableOpacity
              key={peli.id}
              style={styles.card}
              onPress={() => navigation.navigate('DetalleSerie', { serie: peli })}
            >
              <Text style={styles.cardTitle}>{peli.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: peli.image?.medium || peli.image?.original }}
              />
            </TouchableOpacity>
          ))}
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E50914',
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  picker: {
    height: 60,
    width: '80%',
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#E50914',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    width: 170,
    alignItems: 'center',
    backgroundColor: '#7f0000',
    borderRadius: 10,
  },
  cardTitle: {
    color: 'white',
    marginVertical: 10,
  },
  image: {
    width: 170,
    height: 220,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Pelis;