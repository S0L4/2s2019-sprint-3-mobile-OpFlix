import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    AsyncStorage,
    StyleSheet,
    Picker,
    ScrollView,
    TouchableHighlight
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
            plataformas: [],
            tiposLanc: [],

            listaFiltrada: [],

            valorGenero: 0,
            valorPlataforma: 0,
        }
    }

    componentDidMount() {
        this._listarLancamentos();
        this._listarCategorias();
        this._listarPlataformas();
        this._listarTiposLanc();
    }

    _setarValorGenero = (valor) => {
        this.setState({ valorGenero: valor })

        if (this.state.valorPlataforma != 0) {
            this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.idCategoria == valor && x.idPlataforma == this.state.valorPlataforma) })
        } else {
            this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.idCategoria == valor) })
        }

    }

    _setarValorPlataforma = (valor) => {
        this.setState({ valorPlataforma: valor })

        if (this.state.valorGenero != 0) {
            this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.idPlataforma == valor && x.idCategoria == this.state.valorGenero) })
        } else {
            this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.idPlataforma == valor) })
        }
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
            .then(data => this.setState({ categorias: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    _listarPlataformas = async () => {
        const tokenStorage = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.4.240:5000/api/plataformas', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenStorage,
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ plataformas: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    _listarTiposLanc = async () => {
        const tokenStorage = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.4.240:5000/tiposlancamento', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenStorage,
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ tiposLanc: data }))
            .catch(erro => console.warn('Ta aqui Tiago -->' + erro))
    }

    render() {
        return (
            <View style={styles.tudo}>
                <ScrollView>
                    <View style={styles.nome}>
                        <Image
                            style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                            source={require('../assets/img/OpFlix.nome.png')}
                        />
                    </View>

                    <Text style={styles.titulo}>Lançamentos</Text>

                    <View>
                        <Picker style={styles.filtro} selectedValue={this.state.valorGenero} onValueChange={this._setarValorGenero}>
                            <Picker.Item label='Genêro                                                                     v' value='0' />
                            {this.state.categorias.map(element => {
                                return (
                                    <Picker.Item label={element.nome} value={element.idCategoria} style={styles.select} />
                                )
                            })}
                        </Picker>
                    </View>

                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#DB0909' }}></View>

                    <View>
                        <Picker style={styles.filtro} selectedValue={this.state.valorPlataforma} onValueChange={this._setarValorPlataforma}>
                            <Picker.Item label='Plataforma                                                              v' value='0' />
                            {this.state.plataformas.map(element => {
                                return (
                                    <Picker.Item label={element.nome} value={element.idPlataforma} style={styles.select} />
                                )
                            })}
                        </Picker>
                    </View>

                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#DB0909' }}></View>

                    {this.state.valorGenero == 0 && this.state.valorPlataforma == 0 ?
                        (
                            <FlatList style={styles.listaLanc}
                                data={this.state.lancamentos}
                                keyExtractor={item => item.idLancamento}
                                renderItem={({ item }) => (
                                    <View style={styles.filme}>
                                        <TouchableHighlight onPress={() => this.props.navigation.navigate('FilmeScreen', {
                                            nome: item.nome,
                                            imagem: item.imagem,
                                            sinopse: item.sinopse,
                                            genero: item.categoria,
                                            classficacao: item.classficacao
                                        })}>

                                            <Image
                                                style={{ width: '100%', height: 600, alignSelf: "center" }}
                                                source={{ uri: item.imagem }}
                                            />

                                        </TouchableHighlight>

                                        <Text style={styles.tituloFilme}>{item.titulo}</Text>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#720202' }}></View>

                                    </View>
                                )}
                            />
                        )
                        :
                        (
                            <FlatList style={styles.listaLanc}
                                data={this.state.listaFiltrada}
                                keyExtractor={item => item.idLancamento}
                                renderItem={({ item }) => (
                                    <View style={styles.filme}>
                                        {/* <TouchableHighlight onPress={() => this.props.navigation.navigate('Filme', {
                                            imagem: item.imagem,
                                            nome: item.nome,
                                            sinopse: item.sinopse,
                                            genero: item.categoria,
                                            classficacao: item.classficacao
                                        })}> */}

                                        <Image
                                            style={{ width: '100%', height: 600, alignSelf: "center" }}
                                            source={{ uri: item.imagem }}
                                        />

                                        {/* </TouchableHighlight> */}
                                        <Text style={styles.tituloFilme}>{item.titulo}</Text>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#720202' }}></View>

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
        backgroundColor: '#191919',
        height: '100%'
    },
    nome: {
        backgroundColor: 'black',
    },
    listaLanc: {
        backgroundColor: '#191919'
    },
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        padding: 10
    },
    filme: {
        marginBottom: 5,
        padding: 30
    },
    tituloFilme: {
        backgroundColor: '#DB0909',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    filtro: {
        color: 'white',
        fontSize: 14,
        backgroundColor: '#191919',
        marginLeft: 22
    }
})