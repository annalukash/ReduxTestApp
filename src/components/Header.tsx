import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../theme/colors.ts';

const Header = (props: PropsWithChildren) => {
    const insets = useSafeAreaInsets();

    return (
        <View>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={{marginTop: insets.top + 20}}>{props.children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    circle1: {
        backgroundColor: Colors.yellowOpacity,
        width: 445,
        height: 406,
        position: 'absolute',
        borderRadius: 250,
        top: -210,
        left: -37,
    },
    circle2: {
        backgroundColor: Colors.yellowOpacity,
        width: 342,
        height: 342,
        borderRadius: 180,
        position: 'absolute',
        top: -175,
        left: 207,
    },
});

export default Header;
