import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from './pages/login';
import CadastroScreen from './pages/cadastro';
import HomeScreen from './pages/home';
import ContatoScreen from './pages/contato';
import HistoriaScreen from './pages/historia';
import LoadingScreen from './pages/loading';
import SenhaScreen from './pages/senha';

const AuthStack = createStackNavigator({
    Login: { 
        screen: LoginScreen 
    }
})  

const Loading = createStackNavigator({
    Loading: {
        screen: LoadingScreen
    }
})  

const MainNavigation = createBottomTabNavigator({
    Contato: {
        screen: ContatoScreen,
    },
    Home: {
        screen: HomeScreen,
    },
    Historia: {
        screen: HistoriaScreen
    },
},
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            inactiveBackgroundColor: 'black',
            activeBackgroundColor: '#1a1a1a',
            style: {
                width: '100%',
                height: 50,
            }
        },
    }
)

export default createAppContainer(
    createSwitchNavigator(
        {
            MainNavigation,
            AuthStack,
            LoadingScreen,
            CadastroScreen,
            SenhaScreen,
            Loading
        },
        {
            initialRouteName: 'Loading'
        },
    ),
);