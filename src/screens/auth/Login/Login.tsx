//import liraries
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { AuthStackParamList } from '@/navigation/types';

import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';
import { RootState } from '@/redux/store';
import { changeFirstTime } from '@/redux/reducers/auth';

const Login = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();

    const styles = useRTLStyles(isRTL, theme);
    const [email, setEmail] = useState('');
    const { registeredUsers } = useSelector((state: RootState) => state.auth);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const dispatch = useDispatch();

    const handleNext = () => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            Alert.alert('Missing email', 'Please enter your email to continue.');
            return;
        }

        const existingUser = registeredUsers.find(
            user => user.email.toLowerCase() === normalizedEmail
        );

        if (!existingUser) {
            Alert.alert('Account not found', 'Please register first before logging in.');
            navigation.navigate('Signup');
            return;
        }

        navigation.navigate('OTPVerification', { phoneNumber: existingUser.phone });
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const handleGuestContinue = () => {
        dispatch(changeFirstTime(true));
    };

    return (
        <WrapperContainer edges={['bottom', 'top']} style={styles.container}>
            <HeaderComp showBack={false} customStyle={styles.header} />

            <View style={styles.content}>
                <View style={styles.heroSection}>
                    <View style={styles.brandBadge}>
                        <TextComp text='SHOP' style={styles.brandText} />
                    </View>
                    <TextComp text='WELCOME_BACK' style={styles.title} />
                    <TextComp text='SIGN_IN_TO_CONTINUE' style={styles.subtitle} />
                </View>

                <View style={styles.formSection}>
                    <TextComp text='EMAIL_ADDRESS' style={styles.inputLabel} />
                    <TextInputComp
                        value={email}
                        onChangeText={setEmail}
                        placeholder='YOUR_EMAIL_ID'
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={styles.inputContainer}
                    />

                    <ButtonComp
                        title='CONTINUE'
                        onPress={handleNext}
                        style={styles.nextButton}
                    />

                    <View style={styles.signUpPrompt}>
                        <TextComp text='DONT_HAVE_ACCOUNT' style={styles.greyText} />
                        <TextComp text='SIGN_UP' style={styles.signUpLink} onPress={handleSignUp} />
                    </View>

                    <TextComp
                        text='CONTINUE_AS_GUEST'
                        style={styles.guestLink}
                        onPress={handleGuestContinue}
                    />
                </View>

                <TextComp text='SECURE_CHECKOUT_AND_FAST_DELIVERY' style={styles.termsText} />
            </View>
        </WrapperContainer>
    );
};

export default Login;
