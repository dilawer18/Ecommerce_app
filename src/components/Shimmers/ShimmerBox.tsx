import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { commonColors } from '@/styles/colors';

interface ShimmerBoxProps {
  style?: ViewStyle | ViewStyle[];
}

const ShimmerBox = ({ style }: ShimmerBoxProps) => {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.shimmer,
        style,
        {
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: commonColors.gray100,
    borderRadius: 8,
  },
});

export default ShimmerBox;
