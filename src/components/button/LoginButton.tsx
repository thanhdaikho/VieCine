import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface LoginButtonProps {
    title: string; 
    onPress: () => void; 
    buttonStyle?: ViewStyle; 
    textStyle?: TextStyle;  
}

const LoginButton: React.FC<LoginButtonProps> = ({
    title,
    onPress,
    buttonStyle,
    textStyle
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '93%',
        margin: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    text: {
        color: 'white', 
        fontSize: 16,
    },
});

export default LoginButton;
