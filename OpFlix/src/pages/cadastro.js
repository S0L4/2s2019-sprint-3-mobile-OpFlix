import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground

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
            <View style={styles.tudo}>
                <Image
                    style={styles.nome}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/img/OpFlix.background.jpg')}
                    blurRadius={1}
                >

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder='Nome'
                            placeholderTextColor='white'
                            onChangeText={nome => this.setState({ nome })}
                            value={this.state.nome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor='white'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Senha'
                            placeholderTextColor='white'
                            onChangeText={senha => this.setState({ senha })}
                            value={this.state.senha}
                        />
                    </View>

                    <TouchableOpacity onPress={this._realizarCadastro} style={styles.botao}>
                        <Text style={styles.login}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._voltar} style={styles.botao2}>
                        <Text style={styles.texto}>Voltar</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#191919',
        height: '100%'
    },
    nome: {
        height: 90,
        marginLeft: 105,
        marginTop: 30,
        marginBottom: 20,
    },
    form: {
        marginLeft: 30,
        marginTop: 60,
    },
    input: {
        width: 350,
        padding: 5,
        fontFamily: 'Open Sans',
        fontSize: 25,
        borderBottomWidth: 1,
        color: 'white',
        borderColor: 'white',
        marginTop: 30
    },
    botao2: {
        marginLeft: 105,
        marginTop: 35,
        borderRadius: 20,
        width: 200,
        padding: 10,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    botao: {
        marginLeft: 30,
        marginTop: 70,
        backgroundColor: '#DB0909',
        width: 350,
        padding: 10,
    },
    login: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    texto: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
})