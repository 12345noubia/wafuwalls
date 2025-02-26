import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ImageCard from '../components/ImageCard';

const { width } = Dimensions.get('window');
const numColumns = 2;

function randomizeItem(item) {
  const randomHeight = 200 + Math.floor(Math.random() * 150);
  const isPremium = Math.random() < 0.2;
  const isCoins = Math.random() < 0.15;
  
  return {
    id: item.image_id,
    url: item.url,
    title: item.tags?.[0]?.name || "Beautiful Wallpaper",
    height: randomHeight,
    isPremium,
    isCoins,
  };
}

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const url = `https://api.waifu.im/search/?included_tags=waifu&many=true&amount=10&exclude_tags=nsfw&ts=${Date.now()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.images) {
        const newImages = data.images.map(randomizeItem);
        setImages(prev => [...prev, ...newImages]);
        setPage(p => p + 1);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const renderItem = ({ item }) => (
    <ImageCard
      image={item}
      width={(width - 24) / numColumns}
      height={item.height}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color="#EF233C" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        onEndReached={fetchImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
