import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils';

const { width } = Dimensions.get('window');

export const LoadingSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const animatedStyle = {
    opacity: pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <View style={styles.sourceBlock} />
        <View style={styles.dateBlock} />
      </View>
      <View style={styles.imageSource} />
      <View style={styles.textLine} />
      <View style={styles.textLine} />
      <View style={styles.textLineShort} />
      <View style={styles.linkBlock} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAYDARK,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width - 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sourceBlock: {
    width: 80,
    height: 16,
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 4,
  },
  dateBlock: {
    width: 60,
    height: 12,
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 4,
  },
  imageSource: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.GRAYLIGHT,
  },
  textLine: {
    width: '100%',
    height: 14,
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 4,
    marginBottom: 8,
  },
  textLineShort: {
    width: '70%',
    height: 14,
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 4,
    marginBottom: 16,
  },
  linkBlock: {
    width: 100,
    height: 14,
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 4,
  },
});
