import React from 'react';
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CoinsItem = ({ props, onPress }) => {


    getImageArrow = () => {
        if(props.percent_change_1h > 0){
            return require('../../assets/images/arrow_up.png');
        } else {
            return require('../../assets/images/arrow_down.png');
        }
    }

    return(
        <Pressable onPress={onPress}style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{props.name}</Text>
                <Text style={styles.nameText}>{props.symbol}</Text>
                <Text style={styles.priceText}>{`$${props.price_usd}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{props.percent_change_1h}</Text>
                <Image source={getImageArrow()} style={styles.imgArrow} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: "row"
    },
    symbolText : {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: "#FFF",
        fontSize: 14
    },
    percentText: {
        color: "#fff",
        fontSize: 12,
    },
    priceText: {
        color: "#FFF",
        fontSize: 14,
        marginLeft: 16
    },
    imgArrow: {
        width: 22,
        height: 22,
        marginLeft: 10
    }
});

export default CoinsItem;