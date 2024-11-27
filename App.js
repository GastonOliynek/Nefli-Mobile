import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pelis from './src/components/Pelis';
import DetalleSerie from './src/components/DetalleSerie';
import Favoritos from './src/components/Favoritos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pelis">
        <Stack.Screen name="Pelis" component={Pelis} options={{ title: '' }} />
        <Stack.Screen name="DetalleSerie" component={DetalleSerie} options={{ title: 'Detalle de la Serie' }} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}