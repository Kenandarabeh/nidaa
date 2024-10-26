import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { user_signup } from '../api/User';
import Backgound from '../constants/Backgound';
import CustomText from '../constants/CustomText';
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../constants/CustomTextInput';
import emailIcon from '../assets/icons/password.png';
import CustomButton from '../constants/CustomButton';
import SvgIcon from '../assets/images/SvgIcon';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleRecoverPassword = async () => {
        
        navigation.navigate('EnterOtp');
        // setIsLoading(true);
        
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // if (!email || !emailRegex.test(email)) {
        //     alert(t('Please enter a valid email address.'));
        //     setIsLoading(false);
        //     return;
        // }
    
        // try {
        //     await user_signup(email);
            
        // } catch (error) {
        //     console.error(error);
        //     alert(t('An error occurred. Please try again.'));
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (   
        <Backgound>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgIcon icon={'back'}   fill="white" width={30} height={30}  />
                </TouchableOpacity>
            </View>

            <View style={styles.layoutPage}>
                <View style={styles.form}>
                    <CustomText style={styles.title}>{t('Recover password')}</CustomText>
                    <CustomText style={styles.todo}>{t('Enter the email you registered with')}</CustomText>

                    <CustomTextInput
                        iconSource={emailIcon}
                        placeholder={t('Email')}
                        value={email}
                        onChangeText={setEmail}
                        editable={!isLoading}
                    />

                    <CustomButton 
                        style={styles.btn} 
                        textStyle={styles.btnText}
                        onPress={handleRecoverPassword}
                        disabled={isLoading}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : t('Recover password')}
                    </CustomButton>
                </View>

                <View style={styles.logoContainer}>
                    <SvgIcon icon={'logo'} width="54" height="50" />
                </View>
            </View>
        </Backgound>
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
    todo: {
        fontSize: 25,
        color: 'white',
    },
});

export default ForgotPassword;
