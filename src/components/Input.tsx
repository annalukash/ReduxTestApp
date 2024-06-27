import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../theme/colors.ts';

interface IProps {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
}

const Input = ({onChangeText, value, placeholder, secureTextEntry}: IProps) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.container}
            selectionColor={Colors.yellow}
            placeholderTextColor={Colors.grey}
            secureTextEntry={secureTextEntry}
            autoCapitalize={'none'}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 16,
        borderColor: Colors.grey,
    },
});

export default Input;
