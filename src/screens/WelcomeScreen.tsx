import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../components/Header.tsx';
import Button from '../components/Button.tsx';
import Screen from '../emuns/Screen.ts';
import ILogin from '../interfaces/ILogin.ts';
import RootStackParamList from '../interfaces/RootStackParamList.ts';
import {fetchLogout} from '../store/reducer.ts';
import Loader from '../components/Loader.tsx';
import Colors from '../theme/colors.ts';

type Props = NativeStackScreenProps<RootStackParamList, Screen.WelcomeScreen>;

const WelcomeScreen = ({navigation}: Props) => {
    const offset = useSafeAreaInsets();
    const loginState: ILogin = useSelector(
        (state: {login: ILogin}) => state.login,
    );
    const {loading} = loginState;
    const dispatch = useDispatch();

    const logOut = async (): Promise<void> => {
        await dispatch(fetchLogout());

        navigation.popToTop();
    };

    return (
        <View style={{...styles.container, paddingBottom: offset.bottom + 20}}>
            <Header />
            <View style={styles.spacer}>
                <View style={styles.center}>
                    <Text style={styles.title}>Explore the app</Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi maecenas quis interdum enim enim molestie faucibus.
                        Pretium non non massa eros, nunc, urna. Ac laoreet sagittis
                        donec vel. Amet, duis justo, quam quisque egestas. Quam enim
                        at dictum condimentum. Suspendisse.
                    </Text>
                </View>
                <Button title={'Log out'} onPress={logOut} />
            </View>
            {loading && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
    },
    spacer: {
        flex: 1,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: Colors.black,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 16,
    },
    text: {
        fontSize: 12,
        color: Colors.black,
        textAlign: 'center',
    },
});

export default WelcomeScreen;
