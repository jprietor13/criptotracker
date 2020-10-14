import React from 'react';
import { View, Text } from 'react-native';

const CoinsItem = ({ props }) => {
    return(
        <View>
            <Text>{props.name}</Text>
            <Text>{props.symbol}</Text>
        </View>
    );
}

export default CoinsItem;