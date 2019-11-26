import React, { Component } from 'react';

import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';

export default class Filme extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            lancamentos: [],

            nome: null,
            imagem: null,
            sinopse: null,
            genero: null,
            classificacao: null
        }
    }

    componentDidMount() {
        this._listarLancamentos();

        let n = navigation.getParam('nome', null)
        let i = navigation.getParam('imagem', null)
        let s = navigation.getParam('sinopse', null)
        let g = navigation.getParam('categoria', null)
        let c = navigation.getParam('classificacao', null)

        this.setState({ nome: n })
        this.setState({ imagem: i })
        this.setState({ sinopse: s })
        this.setState({ genero: g })
        this.setState({ classificacao: c })
    }

    _voltar = () => {
        this.props.navigation.navigate('AuthStack')
    }

    _listarLancamentos = async () => {
        const tokenStorage = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.4.240:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer ' + tokenStorage,
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Image
                        style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                        source={require('../assets/img/OpFlix.nome.png')}
                    />

                    <Text style={styles.titulo}>{this.state.nome}</Text>

                    <TouchableOpacity onPress={this._voltar}>
                        <Text>Voltar</Text>
                    </TouchableOpacity>

                    <View>
                        <Image
                            style={{ width: '100%', height: 600, alignSelf: "center" }}
                            source={{ uri: this.state.imagem }}
                        />

                        <View>
                            <Text>{this.state.sinopse}</Text>
                            <View>
                                <Text>Genêro: {this.state.genero}</Text>
                                <Text>Classificação: {this.state.classificacao}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}