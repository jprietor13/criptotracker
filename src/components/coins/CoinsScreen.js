import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from '../../libs/Http';
import CoinsItem from './CoinsItem';
import Colors from '../../resources/Colors';

class CoinsScreen extends React.Component {
    
    state = {
        coins: [],
        loading: false
       
    }

    componentDidMount = async () => {

        this.setState({
            loading: true
        });

        const response = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        this.setState({
            coins: response.data,
            loading: false
        });
    }

    handlePress = (coin) => { //se pasa coin como parametro para traer la data por moneda
        this.props.navigation.navigate("CoinDetail", { coin })//componente a redirigir
    }

    render(){

        const { coins, loading } = this.state;

        return(
            <View style={styles.container}>
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