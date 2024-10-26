import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Background from '../constants/Backgound'; // Correct the spelling from 'Backgound'
import CustomText from '../constants/CustomText';
import CustomTextInput from '../constants/CustomTextInput';
import CustomButton from '../constants/CustomButton';
import SvgIcon from '../assets/images/SvgIcon';
import passwordIcon from '../assets/icons/password.png';
import { user_signup } from '../api/auth'; // Import your API function

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleRecoverPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert(t('Error'), t('Passwords do not match.'));
            return;
        }

        setIsLoading(true);

        try {
            // Assuming you need to provide user info for password reset
            const params = {
                // Include additional parameters if needed, e.g., email or user ID
                password: newPassword,
                // Include any other necessary fields
            };

            const response = await user_signup(params); // Call the signup function (update to your password reset API as needed)

            if (response) { // Check for successful response based on your API design
                Alert.alert(t('Success'), t('Your password has been reset successfully.'));
                navigation.navigate('LoginScreen');
            } else {
                Alert.alert(t('Error'), t('Failed to reset password. Please try again.'));
            }
        } catch (error) {
            console.error(error);
            Alert.alert(t('Error'), t('An error occurred. Please try again later.'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Background>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgIcon icon={'back'} fill="white" width={30} height={30} />
                </TouchableOpacity>
            </View>

            <View style={styles.layoutPage}>
                <View style={styles.form}>
                    <CustomText style={styles.title}>{t('New Password')}</CustomText>
                    <CustomText style={styles.todo}>{t('Enter new password')}</CustomText>

                    <CustomTextInput
                        iconSource={passwordIcon}
                        placeholder={t('New Password')}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        editable={!isLoading}
                    />
                    <CustomTextInput
                        iconSource={passwordIcon}
                        placeholder={t('Confirm Password')}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        editable={!isLoading}
                    />

                    <CustomButton 
                        style={styles.btn} 
                        textStyle={styles.btnText}
                        onPress={handleRecoverPassword}
                        disabled={isLoading}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : t('Save')}
                    </CustomButton>
                </View>

                <View style={styles.logoContainer}>
                    <SvgIcon icon={'logo'} width="54" height="50" />
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    backButtonContainer: {
        position: "relative",
        top: 50,
        right: 0,
        paddingHorizontal: 30,
        alignItems: "flex-end",
    },
    layoutPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        padding: 20,
        alignItems: 'center',
    },
    title: { 
        fontSize: 40,
        marginBottom: 30,
        marginTop: 50,
        color: 'white',
        fontWeight: 'bold',
    },
    logoContainer: {
        marginTop: 50,
        backgroundColor: 'transparent',
        color: 'white',
    },
    btn: {
        fontWeight: 'bold',
        borderRadius: 15,
        fontSize: 20,
        backgroundColor: "rgba(0, 49, 67, 1)",
        height: 62,
        width: 320,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
    },
    todo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        alignSelf: 'flex-end',
    },
});

export default ResetPassword;
