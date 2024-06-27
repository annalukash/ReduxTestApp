import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../theme/colors.ts';

const Loader = () => {
    return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
            <ActivityIndicator size={'large'} color={Colors.yellow} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blackOpacity,
    },
});

export default Loader;
