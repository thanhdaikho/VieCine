import React, { Component } from 'react'
import { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BorderTextField from '../components/text-field/BorderTextField';
import PasswordTextField from '../components/text-field/PasswordTextField';
import LoginButton from '../components/button/LoginButton';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignupScreen = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")


    const handleCreateAccount = () => {
        if (password !== rePassword) {
            console.log('Passwords do not match');
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user
                await AsyncStorage.setItem('user', JSON.stringify(user));
                router.navigate('/editprofile')
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log("Email da duoc su dung")
                }
                if (error.code === 'auth/invalid-email') {
                    console.log("Email khong hop le")

                }
                console.error(error)
            })
    }
    return (
        <ImageBackground
            source={require("../assets/images/background-image-light.png")}
            className='flex-1 items-center'>
            <Image source={require('../assets/images/logo.png')}
                resizeMode='center'
                className='w-28 h-28 mt-16' />

            <Text className='mt-5 text-xl tracking-widest'>Embrace the World within</Text>

            <Text className='mt-9 font-bold text-3xl'>Register</Text>

            <BorderTextField
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                iconName='at-sign'
                keyboardType='email-address'
                style={{ marginTop: 45 }}
            />

            <BorderTextField
                value={fullName}
                onChangeText={setFullName}
                placeholder='Full Name'
                iconName='user'
                keyboardType='email-address'
                style={{ marginTop: 10 }}
            />


            <PasswordTextField
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                iconName='key'
                keyboardType='default'
                style={{ marginTop: 10 }}
            />

            <PasswordTextField
                value={rePassword}
                onChangeText={setRePassword}
                placeholder='Confirm Password'
                iconName='key'
                keyboardType='default'
                style={{ marginTop: 10 }}
            />

            <Text className='text-center text-lg mt-6' >By proceeding, You agree to the{"\n"}
                <Text style={styles.colorText}>Terms</Text> &{" "}
                <Text style={styles.colorText}>Privacy</Text>
            </Text>

            <LoginButton
                title='Continue'
                onPress={handleCreateAccount}
                buttonStyle={{ borderColor: 'gray', borderWidth: 1, height: 65, marginTop: 40 }}
                textStyle={{ color: 'black' }} />


            <View className='flex-row'>
                <Text className='text-xl'>Already have an account ?</Text>
                <TouchableOpacity
                    onPress={() => router.push('/login')}>
                    <Text style={styles.colorText}> Login</Text>
                </TouchableOpacity>
                <Text className='text-xl'> now</Text>
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

export default SignupScreen
