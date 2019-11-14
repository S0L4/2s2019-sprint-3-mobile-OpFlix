import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default class Loading extends Component {

    static navigationOptions = {
        header: null,        
    };

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
            <View style={styles.tudo}>
                <Image
                    style={{ height: 90, marginLeft: 105, marginTop: 240, marginBottom: 20 }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />

                {this.state.loading === 1 ?
                    (
                        <View>
                            <ActivityIndicator size="large" color="red"/>
                        </View>
                    )
                    :
                    (
                        <Text style={styles.erro}>Estamos com algum problema. Por favor tente mais tarde.</Text>
                    )
                } 
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#191919',
        height: '100%'
    }
}) 