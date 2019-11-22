import React, { Component } from 'react';

import {
    Text,
    View,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native';

export default class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            email: 'cassiana@email.com',
            senha: '123456'
        }
    }

    // EMAIL: 'cassiana@email.com'
    // SENHA: '123456'

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
    }

    _irPraHome = async token => {
        if (token != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', token);
                this.props.navigation.navigate('MainNavigation');
            } catch (error) {
                <Tex>Email ou senha incorreta. Tente novamente.</Tex>
            }
        }
    }

    _irParaCadastro = () => {
        this.props.navigation.navigate('CadastroScreen')
    }

    _irParaSenha = () => {
        this.props.navigation.navigate('SenhaScreen')
    }

    render() {
        return (
            <View style={styles.tudo}>
                <Image
                    style={styles.nome}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <View>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={require('../assets/img/OpFlix.background.jpg')}
                        blurRadius={1}
                    >

                        <View style={styles.form}>
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
                                textContentType='password'
                                onChangeText={senha => this.setState({ senha })}
                                value={this.state.senha}
                            />
                        </View>

                        <TouchableOpacity onPress={this._realizarLogin} style={styles.botao}>
                            <Text style={styles.login}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._irParaCadastro} style={styles.botao2}>
                            <Text style={styles.texto}>Cadastrar</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </View>
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
    botao: {
        marginLeft: 30,
        marginTop: 80,
        backgroundColor: '#DB0909',
        width: 350,
        padding: 10,
    },
    botao2: {
        marginLeft: 105,
        marginTop: 35,
        borderRadius: 20,
        width: 200,
        padding: 10,
        backgroundColor:'rgba(0,0,0,0.5)'
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