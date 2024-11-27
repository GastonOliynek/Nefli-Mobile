import React from 'react';
import { Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetalleSerie = ({ route }) => {
  const { serie } = route.params;

  const agregarAfavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = favorites ? JSON.parse(favorites) : [];
      favoritesArray.push(serie);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      alert('Agregado a favorites');
    } catch (error) {
      alert('Error al agregar a favorites');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Image style={styles.image} source={{ uri: serie.image?.original }} />

      <Text style={styles.title}>{serie.name}</Text>

      <Text style={styles.genres}>Géneros: {serie.genres.join(', ')}</Text>

      <Text style={styles.summary}>Resumen: {serie.summary.replace(/<[^>]+>/g, '')}</Text>

      <Text style={styles.rating}>Puntuación: {serie.rating.average || 'No disponible'}</Text>

      <Pressable style={styles.button} onPress={agregarAfavorites}>
        <Text style={styles.buttonText}>Agregar a favorites</Text>
      </Pressable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  genres: {
    fontSize: 16,
    marginBottom: 10
  },
  summary: {
    fontSize: 14,
    marginBottom: 10
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#E50914',  // Color de fondo del botón (tomate en este caso)
    paddingVertical: 12,          // Espaciado vertical para hacerlo más grande
    paddingHorizontal: 20,        // Espaciado horizontal
    borderRadius: 8,             // Bordes redondeados
    alignItems: 'center',        // Centra el texto horizontalmente
    justifyContent: 'center',    // Centra el texto verticalmente
    elevation: 3,                // Sombra para Android
    marginBottom: 40,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',               // Color del texto
    fontSize: 16,                // Tamaño de fuente
    fontWeight: 'bold',          // Negrita para el texto
  },
});

export default DetalleSerie;