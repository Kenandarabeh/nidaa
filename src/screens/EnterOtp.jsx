import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Backgound from '../constants/Background';
import CustomText from '../constants/CustomText';
import SvgIcon from '../assets/images/SvgIcon';
import ResetPassword from './ResetPassword';

const EnterOtp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef([]);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleChange = (text, index) => {
        // Set the OTP digit
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input if not the last input
        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleOtpVerification = () => {
        // Here, you would verify the OTP
        const otpCode = otp.join("");
        console.log("Entered OTP: ", otpCode);
        navigation.navigate('ResetPassword'); // Replace 'NextScreen' with your next screen
    };

    return (   
        <Backgound>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgIcon icon={'back'} fill="white" width={30} height={30} />
                </TouchableOpacity>
            </View>

            <View style={styles.layoutPage}>
                <View style={styles.form}>
                    <CustomText style={styles.title}>{t('confirmation code')}</CustomText>
                    <CustomText style={styles.todo}>{t('Enter the code you received via email')}</CustomText>

                    <View style={styles.otpContainer}>
                        {otp.map((_, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => inputs.current[index] = ref}
                                style={styles.otpInput}
                                keyboardType="numeric"
                                maxLength={1}
                                value={otp[index]}
                                onChangeText={(text) => handleChange(text, index)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleOtpVerification}>
                        <CustomText style={styles.btnText}>{t('Send')}</CustomText>
                    </TouchableOpacity>
                    <CustomText style={styles.resendpass}>{t('Resend code')}</CustomText>

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
        color: 'white',
        fontWeight: 'bold',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 40,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'white',
        width: 45,
        height: 60,
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
        borderRadius: 8,
    },
    btn: {
        borderRadius: 15,
        backgroundColor: "rgba(0, 49, 67, 1)",
        height: 62,
        width: 310,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '300',
    },
    resendpass: {
        fontSize: 18,
        color: 'white',
        marginTop:10

    },
    todo: {
      fontSize: 20,
      color: 'white',

  },
});

export default EnterOtp;
