import React from 'react';
import { StyleSheet, View } from 'react-native';
import ShimmerBox from './ShimmerBox';
import { moderateScale } from '@/styles/scaling';

const CartShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerBox style={styles.summary} />

      {[1, 2, 3].map(item => (
        <View key={item} style={styles.card}>
          <ShimmerBox style={styles.image} />
          <View style={styles.content}>
            <ShimmerBox style={styles.title} />
            <ShimmerBox style={styles.text} />
            <ShimmerBox style={styles.price} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(14),
  },
  summary: {
    height: moderateScale(44),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(16),
  },
  card: {
    flexDirection: 'row',
    marginBottom: moderateScale(14),
  },
  image: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(12),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    height: moderateScale(18),
    width: '70%',
    marginBottom: moderateScale(8),
  },
  text: {
    height: moderateScale(14),
    width: '50%',
    marginBottom: moderateScale(10),
  },
  price: {
    height: moderateScale(16),
    width: '30%',
  },
});

export default CartShimmer;
