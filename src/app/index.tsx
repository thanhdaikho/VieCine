import { BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { useRef } from 'react'
import { ActivityIndicator, Button, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomBottomSheetModal, { BottomSheetRef } from '../components/bottom-sheet/CustomBottomSheetModal'
import DropdownMenu from '../components/input/DropdownMenu'
import MainWrapper from '../components/MainWrapper'
import { useCustomTheme } from '../contexts/theme'
import PaymentPages from '../components/pages'
import Step1 from '../components/pages/Step1'
import SmallButton from '../components/button/SmallButton'
import ExpandInput from '../components/input/ExpandInput'
import ExpandedInputScrollView from '../components/scroll/ExpandedInputScrollView'
import { DROPDOWN_MENU_ITEM_HEIGHT } from '@/constants/Size'
import LoginScreen from './login'
import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }
      setInitializing(false);
    };
    
    checkUserStatus();
  }, []);

  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user)); 
        setUser(user);
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      setInitializing(false);
    });

    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />; 
  }

  return <Redirect href="/home" />; 
  // return(
  //   <Redirect href={"/editprofile"} />
  // )
}
