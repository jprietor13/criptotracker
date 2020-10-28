import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; //metodo para crear el stack
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import Colors from '../../resources/Colors';

const Stack = createStackNavigator(); //Se crea el componente Stack en base a createStackNavigator

const CoinsStack = () => { //componente stateless
    //createStackNavigator tiene 2 subcomponentes
    //1. Navigator => que es como el padre
    //2. Screen => nombre de la seccion del toolbar, componente 
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowOpacity: 0
                },
                headerTintColor: Colors.white
            }}>
            <Stack.Screen name="Coins" component={CoinsScreen}/>
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen}/>
        </Stack.Navigator>
    );
}

export default CoinsStack;