import React, { Component, useState } from 'react'
import { ImageBackground, ScrollView, Text, View } from 'react-native'
import ProfileImageUploader from '../components/picker/imagepicker'
import BorderTextField from '../components/text-field/BorderTextField'
import CustomButton from '../components/button/CustomButton'

const EditProfileScreen = () => {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phoneNum, setPhoneNum] = useState<string>('')

    return (
        <ScrollView className='flex-1'>
            <ImageBackground
                source={require("../assets/images/background-image-light.png")} className='pt-20'>

                <ProfileImageUploader
                    defaultImage={require('../assets/images/user_icon.png')}
                    style={{ marginTop: 10 }} />

                <BorderTextField
                    placeholder='Full Name'
                    value={fullName}
                    onChangeText={setFullName}
                    iconName='user' />

                <View className='flex-row'>
                    <BorderTextField
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        iconName='at-sign'
                        style={{ marginTop: 15, width: 240 }}
                    />
                    <CustomButton
                        title='Verified'
                        textColor='white'
                        style={{
                            backgroundColor: '#5E5414',
                            marginTop: 15,
                            marginEnd: 5
                        }}
                        width={127}
                        height={64} />
                </View>
                <View className='flex-row'>
                    <BorderTextField
                        placeholder='Phone Number'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='phone-pad'
                        iconName='phone'
                        style={{ marginTop: 15, width: 240 }}
                    />
                    <CustomButton
                        title='Verified'
                        textColor='black'
                        style={{
                            backgroundColor: 'transparent',
                            marginTop: 15,
                            marginEnd: 5,
                        }}
                        width={127}
                        height={64} 
                        />
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default EditProfileScreen
