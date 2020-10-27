import React from 'react';
import { View, Text,SectionList, Image, StyleSheet } from 'react-native';
import Colors from '../../resources/Colors';

class CoinDetailScreen extends React.Component {

    state = {
        coin: {}
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

    componentDidMount = () => {
        const { coin } = this.props.route.params;
        this.props.navigation.setOptions({ title: coin.symbol })
        this.setState({
            coin
        })
    }

    render(){

        const { coin } = this.state;

        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <Image source={{ uri: this.getSymbolIcon(coin.name) }} style={styles.iconImg}/>
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <SectionList 
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
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    }
})

export default CoinDetailScreen;