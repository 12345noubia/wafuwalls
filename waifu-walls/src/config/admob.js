
import { Platform } from 'react-native';

export const ADMOB_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Replace with your iOS banner ad unit ID
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Replace with your Android banner ad unit ID
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Replace with your iOS interstitial ad unit ID
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Replace with your Android interstitial ad unit ID
  }),
};
