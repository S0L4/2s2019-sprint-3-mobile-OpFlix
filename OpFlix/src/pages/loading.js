import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';

export default class Loading extends Component {

    constructor() {
        super();
        this.state = {
            loading: 0
        }
    }

    componentDidMount = () => {
        this._carregamento();
    }

    _carregamento = async () => {
        this._loadingStart();
        await fetch('http://192.168.4.240:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer',
                'Content-Type': 'application/json',
            }
        })
            .then(resposta => resposta.json())
            .then(() => {
                this._loadingEnd()
                this.props.navigation.navigate('AuthStack')
            }
        )
    }

    _loadingStart = () => {
        this.setState({ loading: 1 });
    }

    _loadingEnd = () => {
        this.setState({ loading: 0 });
    }

    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                {(this.state.loading === 1) ?
                    (
                        <View>
                            <ActivityIndicator size="large" color="red"/>
                        </View>
                    )
                    :
                    (
                        <Text>Estamos com algum problema. Por favor tente mais tarde.</Text>
                    )}
            </View>
        );
    }
} 