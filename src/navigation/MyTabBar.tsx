//import liraries
import ModalComp from '@/components/ModalComp';
import TextComp from '@/components/TextComp';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { Colors, commonColors, ThemeType } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// create a component
const MyTabBar = ({ state, descriptors, navigation }: any) => {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];
    const cartItems = useSelector((state: RootState) => state.cart.items);
    return (
        <View style={styles.container}>
            {state?.routes.filter((route: any) => route.name !== 'ProductDetails').map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({ type: 'tabLongPress', target: route.key });
                };

                const iconColor = isFocused ? commonColors.primary : colors.inputPlaceholder;

                const icon = options.tabBarIcon
                    ? options.tabBarIcon({
                        focused: isFocused,
                        color: iconColor,
                        size: 24,
                    })
                    : null;

                const labelFromOptions = options.tabBarLabel;
                const fallbackLabel = t(route.name.toUpperCase());
                const label =
                    typeof labelFromOptions === 'string'
                        ? labelFromOptions
                        : fallbackLabel;

                const isCartTab = route.name === 'Cart';

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.subContainer}
                    >
                        <View style={styles.iconWrapper}>
                            {icon}
                            {isCartTab && cartItems?.length > 0 && (
                                <View style={styles.badge}>
                                    <TextComp
                                        text={String(cartItems?.length)}
                                        style={styles.badgeText}
                                    />
                                </View>
                            )}
                        </View>
                        <TextComp
                            text={label}
                            style={{
                                color: isFocused ? commonColors.primary : colors.inputPlaceholder,
                                marginTop: moderateScale(8)
                            }}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

// define your styles

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];
    return useMemo(() => StyleSheet.create({
        container: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.background,
            paddingHorizontal: moderateScale(30),
            minHeight: moderateScale(72),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        subContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconWrapper: {
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            right: -8,
            top: -6,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: commonColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
        },
        badgeText: {
            color: '#fff',
            fontSize: 10,
            fontWeight: '700',
            lineHeight: 12,
        },
    }), [isRTL, theme]);
};

//make this component available to the app
export default React.memo(MyTabBar);
