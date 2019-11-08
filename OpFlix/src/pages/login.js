import React, { Component } from 'react';

import {
    Text,
    View,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: 'erik@email.com',
            senha: '123456'
        }
    }

    _realizarLogin = async () => {
        await fetch('http://192.168.4.240:5000/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            }),
        })
            .then(resposta => resposta.json())
            .then(data => this._irPraHome(data.token))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    };

    _irPraHome = async token => {
        if (token != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', token);
                this.props.navigation.navigate('MainNavigation');
            } catch (error) {
                <Tex>Email ou senha incorreta. Tente novamente</Tex>
            }
        }
    }

    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <TextInput
                    placeholder='email'
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='senha'
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                />

                <Text>Lembar de mim</Text>

                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <Text>Esqueceu sua senha?</Text>
                <Text>Deseja-se cadastrar</Text>

            </View>
        );
    }
}