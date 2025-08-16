import React, { memo, useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FunnyFact } from '../../types';
import { COLORS, FONTS } from '../../utils';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const IMAGE_WIDTH = width - 32 - CARD_PADDING * 2;
const MIN_IMAGE_HEIGHT = 200;
const IMAGE_ASPECT_RATIO = 16 / 9;
const DEFAULT_IMAGE_HEIGHT = Math.max(IMAGE_WIDTH / IMAGE_ASPECT_RATIO, MIN_IMAGE_HEIGHT);

interface FunnyFactCardProps {
  funnyFact: FunnyFact;
}
export const FunnyFactCard: React.FC<FunnyFactCardProps> = memo(({ funnyFact }) => {
  const [imageHeight, setImageHeight] = useState(DEFAULT_IMAGE_HEIGHT);
  const [imageError, setImageError] = useState(false);

  const handleOpenLink = useCallback(async () => {
    try {
      await Linking.openURL(funnyFact.originalLink);
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  }, [funnyFact.originalLink]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const handleImageLoad = useCallback((event: any) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    const calculatedHeight = (imgHeight / imgWidth) * IMAGE_WIDTH;
    const finalHeight = Math.max(calculatedHeight, MIN_IMAGE_HEIGHT);
    setImageHeight(finalHeight);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const renderImage = () => {
    if (!funnyFact.urlToImage || imageError) {
      return (
        <View style={[styles.imagePlaceholder, { height: MIN_IMAGE_HEIGHT }]}>
          <Ionicons name="image-outline" size={48} color={COLORS.GRAYLIGHT} />
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      );
    }

    return (
      <Image
        source={{
          uri:
            Platform.OS === 'ios'
              ? funnyFact.urlToImage
              : `${funnyFact.urlToImage}?t=${new Date().getTime()}`,
          cache: 'reload',
        }}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>
            {funnyFact.source} <Text style={styles.date}>/ {funnyFact.category}</Text>
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(funnyFact.publicationDate)}</Text>
      </View>

      {renderImage()}

      <Text style={styles.funnyFact}>{funnyFact.funnyFact}</Text>

      <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
        <Ionicons name="link-outline" size={16} color="#007AFF" />
        <Text style={styles.linkText}>Read Original</Text>
      </TouchableOpacity>
    </View>
  );
});

FunnyFactCard.displayName = 'FunnyFactCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 16,
    padding: CARD_PADDING,
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
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sourceContainer: {
    flex: 1,
  },
  source: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginBottom: 2,
  },
  image: {
    width: IMAGE_WIDTH,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.GRAYDARK,
  },
  imagePlaceholder: {
    width: IMAGE_WIDTH,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAYDARK,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 14,
    color: COLORS.GRAYLIGHT,
    marginTop: 8,
    fontWeight: FONTS.BOLD,
  },
  date: {
    fontSize: 12,
    color: COLORS.GRAYLIGHT,
  },
  funnyFact: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.WHITE,
    marginBottom: 16,
    fontWeight: '600',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 14,
    color: COLORS.LINK,
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
