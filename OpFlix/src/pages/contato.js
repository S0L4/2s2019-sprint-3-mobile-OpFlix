import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class Contato extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                style={{ width: 35, height: 35, tintColor: '#DB0909' }}
                source={require('../assets/img/contato.icon.png')}
            />
        ),
    };

    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.nome}>
                    <Image
                        style={{ height: 90, marginLeft: 105, marginTop: 30, marginBottom: 20 }}
                        source={require('../assets/img/OpFlix.nome.png')}
                    />
                </View>

                <Text style={styles.titulo}>Contato</Text>

                <Text style={styles.texto}>É muito importante para nossa empresa, saber a sua opinião sobre o App. Por favor
                    envie o que você acha sobre o aplicativo e o que podemos melhorar. Muito obrigado,
                    a OpFlix agradece ;)
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Mensagem'
                    placeholderTextColor='white'
                    textContentType='text'
                />

                <TouchableOpacity onPress={this._realizarLogin} style={styles.botao}>
                    <Text style={styles.enviar}>Enviar</Text>
                </TouchableOpacity>

            </View>



        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#191919',
    },
    nome: {
        backgroundColor: 'black'
    },
    titulo: {
        backgroundColor: '#DB0909',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Open Sans',
        fontSize: 22,
        padding: 5,
        marginBottom: 30
    },
    input: {
        width: 350,
        padding: 5,
        fontFamily: 'Open Sans',
        fontSize: 25,
        borderBottomWidth: 1,
        color: 'white',
        borderColor: '#DB0909',
        marginLeft: 30,
        backgroundColor: '#191919'
    },
    botao: {
        marginLeft: 30,
        marginTop: 40,
        backgroundColor: '#DB0909',
        width: 350,
        padding: 10,
    },
    enviar: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    texto: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        padding: 10,
        backgroundColor: '#191919',
        height: 200,
    }
})