import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoritos = ({ navigation }) => {
    const [favoritos, setfavoritos] = useState([]);

    useEffect(() => {
        const fetchfavoritos = async () => {
            try {
                const storedfavoritos = await AsyncStorage.getItem('favoritos');
                console.log('favoritos from storage:', storedfavoritos); // Para verificar el contenido
                if (storedfavoritos) {
                    setfavoritos(JSON.parse(storedfavoritos));
                }
            } catch (error) {
                console.error('Error al cargar los favoritos:', error);
            }
        };

        fetchfavoritos();
    }, []);

    const clearfavoritos = async () => {
        try {
            await AsyncStorage.removeItem('favoritos');  // Borra los favoritos
            setfavoritos([]);  // Vacía el estado de favoritos
            console.log("Favoritos eliminados.");
        } catch (error) {
            console.error("Error al limpiar los favoritos:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.centeredContainer}>

                <TouchableOpacity onPress={clearfavoritos} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Borrar Favoritos</Text>
                </TouchableOpacity>

                {favoritos.length > 0 ? (
                    <View style={styles.gridContainer}>
                        {favoritos.map(peli => (
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
                    <Text style={styles.nofavoritos}>No tienes series favoritas aún.</Text>
                )}
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
    nofavoritos: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    clearButton: {
        backgroundColor: '#E50914',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Favoritos;