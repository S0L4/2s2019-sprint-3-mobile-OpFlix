import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import jwtDecode from 'jwt-decode';

export default class Historia extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                style={{ width: 35, height: 35, tintColor: '#DB0909' }}
                source={require('../assets/img/profile.icon.png')}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            usuarios: [],

            fundoImg: null,
        }
    }

    componentDidMount() {
        this._infoUsuario();
    }

    _infoUsuario = async () => {
        let tokenUsuario = await AsyncStorage.getItem('@opflix:token');
        let decodeToken = jwtDecode(tokenUsuario);

        console.warn(decodeToken);

        if (decodeToken !== null) {
            this.setState({ usuarios: decodeToken })
        } else {
            console.warn('Ta vazio')
        }
    }

    _deslogar = () => {
        AsyncStorage.removeItem('@opflix:token');
        this.props.navigation.navigate('AuthStack');
    }

    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.nome}>
                    <Image
                        style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                        source={require('../assets/img/OpFlix.nome.png')}
                    />
                </View>

                <Text style={styles.titulo}>Profile</Text>

                <View>
                    <View style={styles.info}>
                        <Text style={styles.texto}>Nome - {this.state.usuarios.nome} </Text>
                        <Text style={styles.texto}>Email - {this.state.usuarios.email} </Text>
                    </View>

                    <TouchableOpacity onPress={this._deslogar} style={styles.botao}>
                        <Text style={styles.deslogar}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#191919',
    },
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Open Sans',
        fontSize: 22,
        padding: 5
    },
    botao: {
        marginLeft: 30,
        marginTop: 80,
        backgroundColor: '#DB0909',
        width: 350,
        padding: 10,
    },
    info: {
        marginTop: 50,
        backgroundColor: '#191919',
    },
    texto: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        padding: 10
    },
    deslogar: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    nome: {
        backgroundColor: 'black',
    },  
})