import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../theme/colors.ts';

interface IProps {
    title: string;
    onPress: () => Promise<void> | void;
    disabled?: boolean;
}

const Button = ({title, onPress, disabled}: IProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.container, backgroundColor: disabled ? Colors.yellowOpacity : Colors.yellow }}
            disabled={disabled}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.yellow,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: '400',
    },
});

export default Button;
