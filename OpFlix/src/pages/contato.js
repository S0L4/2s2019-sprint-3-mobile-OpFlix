import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class Contato extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                style={{width: 35, height: 35, tintColor: '#DB0909'}}
                source={require('../assets/img/contato.icon.png')}
            />
        ),
    };

    render() {
        return (
            <View style={styles.view}>
                <Image 
                    style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20}}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                <Text style={styles.titulo}>Contato</Text>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'black',
    },  
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Open Sans',
        fontSize: 18,
        padding: 5
    },

})