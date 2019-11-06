import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from './pages/home';

const MainNavigation = createStackNavigator ({
    Home: {
        screen: HomeScreen,
    }
}) 

export default createAppContainer(MainNavigation);