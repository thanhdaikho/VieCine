import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
    const router = useRouter()
    const handleSignOut = async () => {
        try {
            
            await auth().signOut()
            
            await AsyncStorage.removeItem('user')

            console.log('User signed out successfully!')
            
            router.push('/login') 
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    }
    return (
        <View className='flex-1 items-center justify-center'>
            <Button title='Dang xuat' onPress={handleSignOut}/>
        </View>
    )
}
export default HomeScreen