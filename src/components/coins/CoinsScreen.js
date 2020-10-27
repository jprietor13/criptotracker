import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from '../../libs/Http';
import CoinsItem from './CoinsItem';
import Colors from '../../resources/Colors';
import CoinSearch from './CoinSearch';

class CoinsScreen extends React.Component {
    
    state = {
        coins: [],
        allCoins: [],
        loading: false
       
    }

    componentDidMount = async () => {
        this.getCoins();
    }

    getCoins = async () => {
        this.setState({ loading: true });

        const response = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        this.setState({ 
            coins: response.data, 
            loading: false,
            allCoins: response.data 
        });
    }

    handlePress = (coin) => { //se pasa coin como parametro para traer la data por moneda
        this.props.navigation.navigate("CoinDetail", { coin })//componente a redirigir
    }

    handleSearch = (query) => {
        const { allCoins } = this.state;
        const coinsFiltered = allCoins.filter(coin => {
          return coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({ coins: coinsFiltered });
     }

    render(){

        const { coins, loading } = this.state;

        return(
            <View style={styles.container}>
                <CoinSearch onChange={this.handleSearch}/>    
                {
                    loading ? <ActivityIndicator size="large" color="#FFF" style={styles.indicator}/> : null
                }
                <FlatList 
                    data={ coins }
                    renderItem={({ item }) => 
                        <CoinsItem onPress={() => this.handlePress(item)} props={item} /> 
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    indicator: {
        margin: 10
    },
    textTitle: {
        textAlign: "center",
        margin: 10,
        color: "white"
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 10,
        margin: 10,
    },
    btnText: {
        color: "white",
        textAlign: "center"
    }
})

export default CoinsScreen;