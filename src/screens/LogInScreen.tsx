import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Input from '../components/Input.tsx';
import Button from '../components/Button.tsx';
import Header from '../components/Header.tsx';
import Colors from '../theme/colors.ts';
import ILogin from '../interfaces/ILogin.ts';
import Loader from '../components/Loader.tsx';
import {enterUserCredentialsAction, fetchLogin} from '../store/reducer.ts';
import RootStackParamList from '../interfaces/RootStackParamList.ts';
import Screen from '../emuns/Screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, Screen.LogInScreen>;

const LogInScreen = ({navigation}: Props) => {
    const loginState: ILogin = useSelector(
        (state: {login: ILogin}) => state.login,
    );
    const dispatch = useDispatch();
    const {username, password, loading, isLoggedIn, loginError} = loginState;
    const [isErrorShown, setIsErrorShown] = useState<boolean>(false);

    useEffect(() => {
        setIsErrorShown(!!loginError);
    }, [loginError]);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate(Screen.WelcomeScreen);
        }
    }, [isLoggedIn]);

    const onEnterEmail = (value: string): void => {
        dispatch(
            enterUserCredentialsAction({
                ...loginState,
                username: value,
                loginError: '',
            }),
        );
    };

    const onEnterPassword = (value: string) => {
        dispatch(enterUserCredentialsAction({...loginState, password: value, loginError: ''}));
    };

    const onSubmitLogin = async (): Promise<void> => {
        Keyboard.dismiss();
        if (!username || !password) {
            setIsErrorShown(true);
            return;
        }

        setIsErrorShown(false);
        await dispatch(fetchLogin({username, password}));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <Header>
                    <Text style={styles.title}>Login Account</Text>
                </Header>
                <View style={styles.container}>
                    <View style={{gap: 12}}>
                        <Input
                            placeholder={'Enter username'}
                            value={username}
                            onChangeText={onEnterEmail}
                        />
                        <Input
                            placeholder={'Enter password'}
                            value={password}
                            onChangeText={onEnterPassword}
                            secureTextEntry
                        />
                        {isErrorShown && (
                            <Text style={styles.error}>{loginError}</Text>
                        )}
                    </View>
                    <Button
                        title={'Login'}
                        onPress={onSubmitLogin}
                        disabled={!username || !password}
                    />
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
        justifyContent: 'center',
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
});

export default LogInScreen;
