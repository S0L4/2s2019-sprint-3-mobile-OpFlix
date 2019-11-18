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
                <Image
                    style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                <Text style={styles.titulo}>Profile</Text>

                <View style={styles.imagem}>
                    {/* Imagem do Fundo */}
                    <Image
                        style={styles.imagemProfile}
                        source={{ uri: this.state.usuarios.imagem }}
                    />
                </View>

                <View>
                    <View style={styles.info}>
                        <Text>Nome: {this.state.usuarios.nome}</Text>
                        <Text>Email: {this.state.usuarios.email}</Text>
                    </View>

                    <TouchableOpacity onPress={this._deslogar}>
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
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
    imagemProfile: {
        width: 150,
        height: 150,
        borderLeftWidth: 100,
        borderColor: "red",
    }
})