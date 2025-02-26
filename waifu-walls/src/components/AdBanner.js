
import React from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADMOB_IDS } from '../config/admob';

export function AdBanner() {
  return (
    <BannerAd
      unitId={ADMOB_IDS.BANNER}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
