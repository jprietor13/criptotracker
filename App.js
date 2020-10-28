import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from './src/resources/Colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return(
    <NavigationContainer>

      <Tabs.Navigator 
        tabBarOptions= {{
          tintColor: "#fefefe",
          style: {
            backgroundColor: Color.blackPearl
          }
        }}
      >
        <Tabs.Screen 
          name="Coins" 
          component={CoinStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image 
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/images/bank.png')}
              />
            )
          }}
        />

        <Tabs.Screen 
          name="Favorites" 
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image 
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/images/star.png')}
              />
            )
          }}
        />

      </Tabs.Navigator>
      
    </NavigationContainer>
  );
}

export default App;
