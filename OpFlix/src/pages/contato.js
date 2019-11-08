import React, { Component } from 'react';

import {
    Text,
    View,
    Image
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
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <Text>Contato</Text>
            </View>
        );
    }
} 