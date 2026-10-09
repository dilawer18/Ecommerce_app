import React from 'react';
import { StyleSheet, View } from 'react-native';
import ShimmerBox from './ShimmerBox';
import { moderateScale } from '@/styles/scaling';

const HomeShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerBox style={styles.searchBar} />

      <View style={styles.categoryRow}>
        {[1, 2, 3, 4].map(item => (
          <ShimmerBox key={item} style={styles.categoryPill} />
        ))}
      </View>

      <View style={styles.grid}>
        {[1, 2, 3, 4].map(item => (
          <View key={item} style={styles.card}>
            <ShimmerBox style={styles.image} />
            <ShimmerBox style={styles.title} />
            <ShimmerBox style={styles.subTitle} />
            <ShimmerBox style={styles.price} />
            <ShimmerBox style={styles.button} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(12),
  },
  searchBar: {
    height: moderateScale(46),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(18),
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(16),
  },
  categoryPill: {
    width: moderateScale(80),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    marginRight: moderateScale(10),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: moderateScale(14),
  },
  image: {
    width: '100%',
    height: moderateScale(150),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(10),
  },
  title: {
    height: moderateScale(18),
    width: '80%',
    marginBottom: moderateScale(8),
  },
  subTitle: {
    height: moderateScale(14),
    width: '65%',
    marginBottom: moderateScale(10),
  },
  price: {
    height: moderateScale(16),
    width: '35%',
    marginBottom: moderateScale(12),
  },
  button: {
    height: moderateScale(32),
    borderRadius: moderateScale(8),
  },
});

export default HomeShimmer;
