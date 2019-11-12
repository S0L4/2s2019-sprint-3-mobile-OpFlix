import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    AsyncStorage,
    StyleSheet,
    Picker
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

export default class Home extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                style={{ width: 35, height: 35, tintColor: '#DB0909' }}
                source={require('../assets/img/lancamento.icon.png')}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            lancamentos: [],
            categorias: [],
            listaNova: [],

            valorEscolhido: null,
        }
    }

    componentDidMount() {
        this._listarLancamentos();
        this._listarCategorias();
    }

    _setarValor = (valor) => {
        this.setState({ valorEscolhido: valor })
        if (valor === 0) {
            this.setState({ listaNova: [] })
        }
        this.setState({ listaNova: this.state.lancamentos.filter(x => x.idCategoria == valor) })
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.4.240:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer' + await AsyncStorage.getItem('@opflix:token'),
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    _listarCategorias = async () => {
        await fetch('http://192.168.4.240:5000/api/categorias', {
            headers: {
                'Authorization': 'Bearer' + await AsyncStorage.getItem('@opflix:token'),
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ categorias: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    render() {
        return (
            <View style={styles.view}>
                <Image
                    style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                <Text style={styles.titulo}>Lançamentos</Text>

                <View>
                    <Picker selectedValue={this.state.valorEscolhido} onValueChange={this._setarValor}>
                        <Picker.Item label='Selecione um gênero' value='0' />
                        {this.state.categorias.map(element => {
                            return (    
                                <Piker.Item label={element.nome} value={item.idCategoria} />
                            )
                        })}
                    </Picker>

                    <Text>{this.state.valorEscolhido}</Text>
                </View>

                {this.state.listaNova.lenght > 0 ? <FlatList style={styles.listaLanc}
                    data={this.state.listaNova}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View style={styles.filme}>
                            <Image
                                style={{ width: '100%', height: 600, alignSelf: "center" }}
                                source={{ uri: item.imagem }}
                            />
                            <Text>{item.titulo}</Text>
                            <Text>{item.sinopse}</Text>
                            <Text>{item.idCategoriaNavigation.nome}</Text>
                            <Text>{item.duracaoMin}min</Text>
                        </View>
                    )}
                
                /> :
                    
                    <FlatList style={styles.listaLanc}
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View style={styles.filme}>
                            <Image
                                style={{ width: '100%', height: 600, alignSelf: "center" }}
                                source={{ uri: item.imagem }}
                            />
                            <Text>{item.titulo}</Text>
                            <Text>{item.sinopse}</Text>
                            <Text>{item.idCategoriaNavigation.nome}</Text>
                            <Text>{item.duracaoMin}min</Text>
                        </View>
                    )}
                />}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'black',
        height: '99%'
    },
    listaLanc: {
        backgroundColor: '#191919'
    },
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Open Sans',
        fontSize: 18,
        padding: 5
    },
    filme: {
    }
})