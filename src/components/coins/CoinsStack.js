import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; //metodo para crear el stack
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';

const Stack = createStackNavigator(); //Se crea el componente Stack en base a createStackNavigator

const CoinsStack = () => { //componente stateless
    //createStackNavigator tiene 2 subcomponentes
    //1. Navigator => que es como el padre
    //2. Screen => nombre de la seccion del toolbar, componente 
    return(
        <Stack.Navigator>
            <Stack.Screen name="Coins" component={CoinsScreen}/>
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen}/>
        </Stack.Navigator>
    );
}

export default CoinsStack;