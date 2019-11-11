import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            idTipoUsuario: null
        }
    }

    _realizarCadastro = async () => {
        await fetch('http://192.168.4.240:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                idTipoUsuario: 2
            })
        })
            .then(this._irPraHome())
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    _irPraHome = () => {
        try {
            this.props.navigation.navigate('MainNavigation');
        } catch (error) {
            <Tex>Estamos com algum problema. Por favor tente mais tarde.</Tex>
        }
    }

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

                <TextInput
                    placeholder='Nome'
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                />
                <TextInput
                    placeholder='Email'
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='Senha'
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                />

                <TouchableOpacity onPress={this._realizarCadastro}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._voltar}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 