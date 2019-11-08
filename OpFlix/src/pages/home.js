import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    AsyncStorage
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
        }
    }

    componentDidMount() {
        this._listarLancamentos();
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.4.240:5000/api/lancamentos', {
            headers: {
                'Authorization' : 'Bearer' + await AsyncStorage.getItem('@opflix:token'),
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
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                <Text>Lançamentos</Text>

                <FlatList
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({item}) => (
                        <View>
                            <Image
                                style={{widht: 144, height: 240}}
                                source={{ uri : item.imagem }}
                            />
                            <Text>{item.titulo}</Text>
                            <Text>{item.sinopse}</Text>
                            <Text>{item.idCategoriaNavigation.nome}</Text>
                            <Text>{item.duracaoMin}min</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
} 