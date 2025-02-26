import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ImageCard({ image, width, height }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width,
          height,
          margin: 4,
        },
      ]}
    >
      <Image
        source={{ uri: image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="download-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {image.isPremium && (
        <View style={styles.premiumBadge}>
          <Ionicons name="diamond" size={16} color="#fff" />
          <Text style={styles.badgeText}>Premium</Text>
        </View>
      )}

      {image.isCoins && (
        <View style={styles.coinsBadge}>
          <Ionicons name="logo-bitcoin" size={16} color="#fff" />
          <Text style={styles.badgeText}>Coins</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF233C',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  coinsBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
