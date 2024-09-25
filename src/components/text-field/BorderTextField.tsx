import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface BorderTextFieldProps extends TextInputProps {
    value: string; 
    onChangeText: (text: string) => void; 
    iconName?: string;
}

const BorderTextField: React.FC<BorderTextFieldProps> = ({
    value,
    onChangeText,
    placeholder = "",
    style,
    iconName = "email",
    ...rest
}) => {
    return (
        <View style={[styles.container, style]}>

            <Icon name={iconName} size={26} color={'#AB9A1C'} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="gray"
                {...rest}
            />
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
});
export default BorderTextField;
