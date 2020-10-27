import React from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from '../../resources/Colors';

class CoinSearch extends React.Component {

    state = {
        query: ""
    }

    handleText = (query) => {
        this.setState({ query });
        if(this.props.onChange){
            this.props.onChange(query);
        }
    }

    render(){

        const { query } = this.props;

        return(
            <View>
                <TextInput
                    style= {[
                        styles.textInput,
                        Platform.OS == "ios" ? styles.textInputIos : styles.textInputAndroid
                    ]}
                    onChangeText={this.handleText} 
                    value={query}
                    placeholder="Search Coin"
                    placeholderTextColor="#fff"    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: "#fff"
    },
    textInputAndroid: {
        borderWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIos: {
        margin: 8,
        borderRadius: 8
    }
    
})

export default CoinSearch;