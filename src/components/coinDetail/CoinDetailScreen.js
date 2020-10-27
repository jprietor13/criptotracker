import React from 'react';
import { View, Text,SectionList, Image, StyleSheet, FlatList } from 'react-native';
import Colors from '../../resources/Colors';
import Http from '../../libs/Http';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends React.Component {

    state = {
        coin: {},
        merkets: [] //creamos markets como un array vacio
    }

    getSymbolIcon = (name) => {
        if(name){
            const symbol = name.toLowerCase().replace(" ", "-");
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
        }
    }

    getSections = (coin) => {
        const sections = [
            {
                title: "Market cup",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ]

        return sections;
    }

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`; //pasamos el coin id
        const markets = await Http.instance.get(url); //consultamos la libreria HTTP
        this.setState({ markets }); //seteamos markets de state
    }

    componentDidMount = () => {
        const { coin } = this.props.route.params;
        this.props.navigation.setOptions({ title: coin.symbol });
        this.getMarkets(coin.id);
        this.setState({
            coin
        })
    }

    render(){

        const { coin, markets } = this.state;

        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <Image source={{ uri: this.getSymbolIcon(coin.name) }} style={styles.iconImg}/>
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <SectionList style={styles.section}
                    sections={this.getSections(coin)} 
                    keyExtractor={(item) => item}
                    renderItem={({ item }) =>
                        <View style={styles.sectionItem}>
                             <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) =>
                        <View style={styles.sectionHeader}>
                             <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />

                <Text style={styles.marketTitle}>Markets</Text>

                <FlatList
                    style={styles.list}
                    horizontal={true} 
                    data={markets}
                    renderItem={({ item }) => <CoinMarketItem item={item}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row"
    },  
    iconImg: {
        width: 25,
        height: 25
    },
    titleText: {
       fontSize: 16,
       color: Colors.white,
       fontWeight: "bold",
       marginLeft: 8,
    },
    marketTitle: {
        color: Colors.white,
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },  
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    section: {
        maxHeight: 220
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    }
})

export default CoinDetailScreen;