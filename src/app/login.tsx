import * as React from 'react';
import { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BorderTextField from '../components/text-field/BorderTextField';
import PasswordTextField from '../components/text-field/PasswordTextField';
import LoginButton from '../components/button/LoginButton';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await AsyncStorage.setItem('user', JSON.stringify(user));
                router.push('/home');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('Email không hợp lệ.');
                } else if (error.code === 'auth/user-not-found') {
                    console.log('Tài khoản không tồn tại.');
                } else if (error.code === 'auth/wrong-password') {
                    console.log('Mật khẩu không chính xác.');
                } else if (error.code === 'auth/too-many-requests') {
                    console.log('Tài khoản đã bị khóa do quá nhiều lần đăng nhập thất bại.');
                } else {
                    console.error(error);
                }
            });
    };
    
    return (
        <ImageBackground
            source={require("../assets/images/background-image-light.png")}
            className='flex-1 items-center'>
            <Image source={require('../assets/images/logo.png')}
                resizeMode='center'
                className='w-28 h-28 mt-16' />

            <Text className='mt-5 text-xl tracking-widest'>Embrace the World within</Text>

            <Text className='mt-9 font-bold text-3xl'>Login</Text>

            <BorderTextField
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                iconName='at-sign'
                keyboardType='email-address'
                style={{ marginTop: 45 }}
            />

            <PasswordTextField
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                iconName='key'
                keyboardType='default'
                style={{ marginTop: 25 }}
            />

            <Text className='text-center text-lg mt-6' >By proceeding, You agree to the{"\n"}
                <Text style={styles.colorText}>Terms</Text> &{" "}
                <Text style={styles.colorText}>Privacy</Text>
            </Text>

            <LoginButton
                title='Continue'
                onPress={handleLogin}
                buttonStyle={{ borderColor: 'gray', borderWidth: 1, height: 65, marginTop: 40 }}
                textStyle={{ color: 'black' }} />

            
            <Text className='text-center text-lg mt-28' >You have any problem ?</Text>
            <View className='flex-row mb-2'>
                <Text className='text-xl'>Try</Text>
                <TouchableOpacity 
                    onPress={() => router.push('/signup')}>
                    <Text style={styles.colorText}> Register</Text>
                </TouchableOpacity>
                <Text className='text-xl'> or</Text>
                <TouchableOpacity>
                    <Text style={styles.colorText}> Reset Password</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    colorText: {
        color: "#AB9A1C",
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 22,
    }
});
export default LoginScreen
