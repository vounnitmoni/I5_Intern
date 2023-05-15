import React from 'react';
import {View, StyleSheet, ImageProps, TouchableOpacity} from 'react-native';
import {Text, Card} from '@rneui/themed';

export type VenueProps = {
  image: ImageProps['source'],
  height?: number,
  onPress?: () => void;
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    minWidth: 320,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 'auto',
    textAlign: 'center',
  },
  cardImage: {
    height: 200,
    width: '100%',
  }
});

export function Venue({image, height = 200, onPress }: VenueProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Image source={image} style={[styles.cardImage, {height}]} />
      </Card>
    </TouchableOpacity>
  );
}