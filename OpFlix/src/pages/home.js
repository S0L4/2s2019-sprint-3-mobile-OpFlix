import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    AsyncStorage,
    StyleSheet,
    Picker,
    ScrollView
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

export default class Home extends Component {

    static navigationOptions = {
        header: null,        
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

            valorEscolhido: 0,
            token: null
        }
    }

    componentDidMount() {
        this._listarLancamentos();
        this._setarToken();
        this._listarCategorias();
    }

    _setarToken = async () => {
        try {
            const tokenStorage = await AsyncStorage.getItem('@opflix:token');
            if (tokenStorage != null) {
                this.setState({ token: tokenStorage })
            }
        } catch (error) {
            console.warn('Token' + erro)
        }
    }

    _setarValor = (valor) => {
        this.setState({ valorEscolhido: valor })
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.4.240:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    _listarCategorias = async () => {
        const tokenStorage = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.4.240:5000/api/categorias', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenStorage,
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            // .then(data => console.warn(data))
            .then(data => this.setState({ categorias: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    render() {
        return (
            <View style={styles.tudo}>
                <ScrollView>
                    <Image
                        style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                        source={require('../assets/img/OpFlix.nome.png')}
                    />

                    <Text style={styles.titulo}>Lançamentos</Text>

                    <View>
                        <Picker selectedValue={this.state.valorEscolhido} onValueChange={this._setarValor}>
                            <Picker.Item label='Selecione um gênero' value='0'/>
                            {this.state.categorias.map(element => {
                                return (
                                    <Picker.Item label={element.nome} value={element.idCategoria} style={styles.select}/>
                                )
                            })}
                        </Picker>
                    </View>

                    {this.state.valorEscolhido == 0 ?
                        (

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

                                    </View>
                                )}
                            />

                        )
                        :
                        (

                            <FlatList style={styles.listaLanc}
                                data={this.state.lancamentos.filter(x => x.idCategoria == this.state.valorEscolhido)}
                                keyExtractor={item => item.idLancamento}
                                renderItem={({ item }) => (
                                    <View style={styles.filme}>
                                        <Image
                                            style={{ width: '100%', height: 600, alignSelf: "center" }}
                                            source={{ uri: item.imagem }}
                                        />
                                        <Text style={styles.tituloFilme}>{item.titulo}</Text>
                                    </View>
                                )}
                            />
                            
                        )
                    }

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: 'black',
        height: '100%'
    },
    listaLanc: {
        backgroundColor: '#191919'
    },
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        padding: 5
    },
    filme: {
        marginBottom: 50,
        padding: 30
    },
    tituloFilme: {        
        backgroundColor: 'white',
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
    },  
    select: {
        color: 'white',
        fontSize: 14,
        backgroundColor: '#720202'
    }
})