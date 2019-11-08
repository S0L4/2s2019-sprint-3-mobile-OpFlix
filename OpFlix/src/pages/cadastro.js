import React, { Component } from 'react';

import {
    Text,
    View,
    Image
} from 'react-native';

export default class Cadastro extends Component {
    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <Text>Cadastro</Text>
            </View>
        );
    }
} 