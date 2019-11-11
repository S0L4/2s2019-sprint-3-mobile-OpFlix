import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Senha extends Component {

    _voltar = () => {
        this.props.navigation.navigate('AuthStack')
    }

    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <Text>Senha</Text>

                <TouchableOpacity onPress={this._voltar}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 