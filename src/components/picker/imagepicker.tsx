import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageSourcePropType, ViewStyle, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'; // Icon cho camera

interface ProfileImageUploaderProps {
    defaultImage: ImageSourcePropType;
    style?: ViewStyle;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ defaultImage, style }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Mở thư viện ảnh
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Hiển thị ảnh đã chọn
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={selectedImage ? { uri: selectedImage } : defaultImage} 
                        style={styles.profileImage}
                    />
                    {!selectedImage && (
                        <View style={styles.cameraIconWrapper}>
                            <Feather
                                name="camera"
                                size={50}
                                color="white"
                            />
                            <Text style={styles.cameraText}>Change Avatar</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageWrapper: {
        position: 'relative',
        width: 220,
        height: 220,
        borderRadius: 110,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    cameraIconWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -45 }],
        alignItems: 'center', 
    },
    cameraText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'condensed',
        marginTop: 5,
    },
});

export default ProfileImageUploader;
