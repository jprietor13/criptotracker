import React from 'react';
import { View, Text,SectionList, Image, Pressable, StyleSheet, FlatList } from 'react-native';
import Colors from '../../resources/Colors';
import Http from '../../libs/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

class CoinDetailScreen extends React.Component {

    state = {
        coin: {},
        merkets: [], //creamos markets como un array vacio
        isFavorite: false//para ver si el coin ya esta en favoritos
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

    toogleFavorite = () => {
        if(this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

    addFavorite = () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;

        const stored = Storage.instance.store(key, coin);

        if(stored) {
            this.setState({ isFavorite: true });
        }
    }

    removeFavorite = () => {

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

        const { coin, markets, isFavorite } = this.state;

        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                   <View style={styles.row}>
                        <Image source={{ uri: this.getSymbolIcon(coin.name) }} style={styles.iconImg}/>
                        <Text style={styles.titleText}>{coin.name}</Text>
                   </View>

                    <Pressable 
                            onPress={this.toogleFavorite}
                            style={[
                            styles.btnFavorite,
                            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
                        ]}>
                        <Text style={styles.btnFavoriteText}>
                            { isFavorite ? "Remove favorite" : "Add favorite" }
                        </Text>
                    </Pressable>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteText: {
        color: Colors.white
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    },
    row: {
        flexDirection: "row",
    }
})

export default CoinDetailScreen;