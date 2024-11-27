import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoritos = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        console.log('Favorites from storage:', storedFavorites); // Para verificar el contenido
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error al cargar los favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {favorites.length > 0 ? (
        <View style={styles.gridContainer}>
        {favorites.map(peli => (
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
      ) : (
        <Text style={styles.noFavorites}>No tienes series favoritas aún.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  noFavorites: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Favoritos;