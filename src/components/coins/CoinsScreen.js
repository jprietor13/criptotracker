import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Http from '../../libs/Http';

class CoinsScreen extends React.Component {
    
    componentDidMount = async () => {
        const coins = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        console.log(coins);
    }

    handlePress = () => {
        console.log("Go to details", this.props);
        this.props.navigation.navigate("CoinDetail")//componente a redirigir
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textTitle}>Coins</Text>
                <Pressable onPress={this.handlePress} style={styles.btn}>
                    <Text style={styles.btnText}>Ir a Detalles</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
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