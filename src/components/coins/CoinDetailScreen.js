import React from 'react';
import { View, Text } from 'react-native';

class CoinDetailSreen extends React.Component {

    componentDidMount = () => {
        console.log("coin", this.props.route.params)
    }

    render(){
        return(
            <View>
                <Text>Coin Details Screen</Text>
            </View>
        );
    }
}

export default CoinDetailSreen;