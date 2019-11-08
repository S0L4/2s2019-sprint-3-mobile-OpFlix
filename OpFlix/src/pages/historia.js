import React, { Component } from 'react';

import {
    Text,
    View,
    Image
} from 'react-native';

export default class Historia extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                style={{width: 35, height: 35, tintColor: '#DB0909'}}
                source={require('../assets/img/historia.icon.png')}
            />
        ),
    };

    render() {
        return (
            <View>
                <Image
                    style={{ height: 90, alignItems: 'center' }}
                    source={require('../assets/img/OpFlix.nome.png')}
                />
                <Text>História</Text>
            </View>

        );
    }
} 