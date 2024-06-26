import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";

import Screen from "../emuns/Screen.ts";
import LogInScreen from "./LogInScreen.tsx";
import WelcomeScreen from "./WelcomeScreen.tsx";
import RootStackParamList from "../interfaces/RootStackParamList.ts";
import ILogin from "../interfaces/ILogin.ts";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
    const loginState: ILogin = useSelector((state: { login: ILogin }) => state.login);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={loginState.isLoggedIn ? Screen.WelcomeScreen : Screen.LogInScreen}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={Screen.LogInScreen} component={LogInScreen} />
                <Stack.Screen name={Screen.WelcomeScreen} component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;