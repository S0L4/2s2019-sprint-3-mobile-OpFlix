import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Senha extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    _voltar = () => {
        this.props.navigation.navigate('AuthStack')
    }


    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
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