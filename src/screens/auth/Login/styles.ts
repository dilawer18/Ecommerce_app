import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, commonColors, ThemeType } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme ?? 'light'];

    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: moderateScale(18),
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: moderateScale(12),
            paddingBottom: moderateScale(24),
        },
        heroSection: {
            marginTop: moderateScale(12),
            // marginBottom: moderateScale(28),
        },
        brandBadge: {
            alignSelf: 'flex-start',
            backgroundColor: commonColors.primary,
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(6),
            borderRadius: moderateScale(18),
            marginBottom: moderateScale(16),
        },
        brandText: {
            color: commonColors.white,
            fontSize: moderateScale(12),
            fontFamily: fontFamily.bold,
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        title: {
            fontSize: moderateScale(28),
            marginBottom: moderateScale(8),
            textTransform: 'uppercase',
            fontFamily: fontFamily.bold,
            color: colors.text,
        },
        subtitle: {
            fontSize: moderateScale(14),
            color: colors.inputPlaceholder,
            fontFamily: fontFamily.regular,
            lineHeight: moderateScale(20),
        },
        formSection: {
            marginBottom: moderateScale(24),
        },
        inputLabel: {
            fontSize: moderateScale(13),
            fontFamily: fontFamily.medium,
            marginBottom: moderateScale(10),
            color: colors.text,
            textTransform: 'uppercase',
        },
        inputContainer: {
            marginBottom: moderateScale(18),
            borderRadius: moderateScale(12),
        },
        nextButton: {
            height: moderateScale(52),
            backgroundColor: commonColors.primary,
            borderRadius: moderateScale(12),
            marginBottom: moderateScale(18),
        },
        signUpPrompt: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(6),
        },
        greyText: {
            fontSize: moderateScale(12),
            color: colors.inputPlaceholder,
            fontFamily: fontFamily.regular,
        },
        signUpLink: {
            fontSize: moderateScale(12),
            color: commonColors.primary,
            fontFamily: fontFamily.bold,
        },
        guestLink: {
            marginTop: moderateScale(14),
            fontSize: moderateScale(12),
            color: colors.inputPlaceholder,
            fontFamily: fontFamily.medium,
            textAlign: 'center',
            textDecorationLine: 'underline',
        },
        termsText: {
            fontSize: moderateScale(12),
            color: colors.inputPlaceholder,
            fontFamily: fontFamily.regular,
            textAlign: 'center',
            marginTop: moderateScale(8),
        },
        header: {
            paddingHorizontal: 0,
        }
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;