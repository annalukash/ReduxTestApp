import React, { useState } from "react";
import {View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import Header from "../components/Header.tsx";
import Colors from "../theme/colors.ts";
import ILogin from "../interfaces/ILogin.ts";
import Loader from "../components/Loader.tsx";
import {enterUserCredentialsAction, fetchLogin} from "../store/reducer.ts";
import RootStackParamList from "../interfaces/RootStackParamList.ts";
import Screen from "../emuns/Screen.ts";


type Props = NativeStackScreenProps<RootStackParamList, Screen.LogInScreen>;

const LogInScreen = ({ navigation }: Props) => {
    const loginState: ILogin = useSelector((state: { login: ILogin }) => state.login);
    const dispatch = useDispatch();
    const { username, password, loading} = loginState;
    const [isErrorShown, setIsErrorShown] = useState<boolean>(false);

    const onEnterEmail = (value: string): void => {
        dispatch(enterUserCredentialsAction({ ...loginState, username: value }));
    };

    const onEnterPassword = (value: string) => {
        dispatch(enterUserCredentialsAction({ ...loginState, password: value }));
    };

    const onSubmitLogin = async () : Promise<void> => {
        if (!username || !password) {
            setIsErrorShown(true);
            return;
        }

        setIsErrorShown(false);
        dispatch(fetchLogin(true));
        navigation.navigate(Screen.WelcomeScreen);
    };

    console.log(loginState)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <Header>
                    <Text style={styles.title}>Login Account</Text>
                </Header>
                <View style={styles.container}>
                    <View style={{ gap: 12 }}>
                        <Input placeholder={'Enter email'} value={username} onChangeText={onEnterEmail} />
                        <Input placeholder={'Enter password'} value={password} onChangeText={onEnterPassword} secureTextEntry />
                        {isErrorShown && <Text style={styles.error}>Please, enter email and password</Text>}
                    </View>
                    <Button title={'Login'} onPress={onSubmitLogin} disabled={!username && !password} />
                </View>
                {loading && <Loader />}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: "center",
        gap: 30,
    },
    title: {
        fontSize: 24,
        color: Colors.black,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    error: {
        color: Colors.red,
    },
})

export default LogInScreen;