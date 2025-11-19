import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export function OnboardingShape() {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.halfCircle, styles.halfCircle1]} />
      <View style={[styles.halfCircle, styles.halfCircle2]} />
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: 200,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  circle1: {
    width: 120,
    height: 120,
    borderRadius: 60,
    top: 20,
    right: 40,
  },
  circle2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 30,
    left: 20,
  },
  circle3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 80,
    left: 60,
  },
  halfCircle: {
    position: 'absolute',
    backgroundColor: '#D4A574',
  },
  halfCircle1: {
    width: 60,
    height: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: 60,
    left: 30,
  },
  halfCircle2: {
    width: 80,
    height: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    bottom: 50,
    right: 50,
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#B5906A',
    borderRadius: 50,
  },
  dot1: {
    width: 20,
    height: 20,
    top: 40,
    left: 100,
  },
  dot2: {
    width: 12,
    height: 12,
    bottom: 80,
    right: 80,
  },
});