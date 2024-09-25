import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

interface PasswordTextFieldProps extends TextInputProps {
    value: string; 
    onChangeText: (text: string) => void; 
    iconName?: string;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
    value,
    onChangeText,
    placeholder = "Password",
    style,
    iconName = "key",
    ...rest
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, style]}>
            <Icon name={iconName} size={24} color={'#AB9A1C'} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="gray"
                secureTextEntry={!isPasswordVisible} 
                {...rest}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="gray"
                    style={styles.eyeIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AB9A1C',
        borderWidth: 1,
        alignItems:'center',
        borderRadius: 5,
        height: 65, 
        paddingHorizontal: 15, 
        marginHorizontal: 15
    },
    input: {
        flex: 1, 
        paddingLeft: 10, 
        fontSize: 20, 
    },
    icon: {
        paddingRight: 10, 
    },
    eyeIcon: {
        paddingLeft: 10,
    },
});

export default PasswordTextField;
