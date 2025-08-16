import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorMessage, FunnyFactCard, LoadingSkeleton } from '../../components';
import { FunnyFact } from '../../types';
import { ARTICLES_COUNT, COLORS, FONTS } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { articlesSelector, funnyFactsSelector } from '../../store/selectors';
import { clearFunnyFacts } from '../../store/funnyFactsStore';
import { fetchArticles } from '../../store/articlesStore/articlesActions';
import { generateFunnyFacts } from '../../store/funnyFactsStore/funnyFactsActions';
import { Ionicons } from '@expo/vector-icons';
import { clearError } from '../../store/funnyFactsStore/funnyFactsSlice';

const SKELETON_COUNT = 10;
const IS_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';
const ITEM_HEIGHT = 360;
const INITIAL_NUM_TO_RENDER = 5;
const MAX_TO_RENDER_PER_BATCH = 5;
const WINDOW_SIZE = 5;

const MemoizedFunnyFactCard = React.memo(FunnyFactCard);
const MemoizedLoadingSkeleton = React.memo(LoadingSkeleton);

const MemoizedFooterComponent = React.memo<{ count: number; total: number }>(({ count, total }) => (
  <Text style={styles.footerListFYItext}>
    Generated {count} from {total} funny facts. {total - count} failed.
  </Text>
));

MemoizedFooterComponent.displayName = 'FooterComponent';

export const NewsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading: articlesLoading, error: articlesError } = useAppSelector(articlesSelector);
  const {
    items: funnyFacts,
    loading: funnyFactsLoading,
    error: funnyFactsError,
  } = useAppSelector(funnyFactsSelector);

  const isLoading = useMemo(
    () => articlesLoading || funnyFactsLoading,
    [articlesLoading, funnyFactsLoading]
  );

  const error = useMemo(() => articlesError || funnyFactsError, [articlesError, funnyFactsError]);

  const loadData = useCallback(async () => {
    try {
      dispatch(clearFunnyFacts());
      dispatch(clearError());
      const articlesResult = await dispatch(fetchArticles()).unwrap();
      await dispatch(generateFunnyFacts(articlesResult)).unwrap();
    } catch (error) {
      console.log('Failed to load data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!funnyFacts.length) {
      loadData();
    }
  }, [funnyFacts.length, loadData]);

  const handleRefresh = useCallback(() => {
    loadData();
  }, [loadData]);

  const renderFunnyFact = useCallback(
    ({ item }: { item: FunnyFact }) => <MemoizedFunnyFactCard funnyFact={item} />,
    []
  );

  const keyExtractor = useCallback((item: FunnyFact, index: number) => {
    return item.originalLink || `item-${index}`;
  }, []);

  const skeletonData = useMemo(
    () =>
      Array.from({ length: SKELETON_COUNT }, (_, index) => ({
        id: `skeleton-${index}`,
        key: index,
      })),
    []
  );

  const renderSkeletonItem = useCallback(
    ({ item }: { item: { id: string; key: number } }) => <MemoizedLoadingSkeleton key={item.id} />,
    []
  );

  const skeletonKeyExtractor = useCallback((item: { id: string; key: number }) => item.id, []);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isLoading}
        onRefresh={handleRefresh}
        colors={[COLORS.PRIMARY]}
        tintColor={COLORS.WHITE}
      />
    ),
    [isLoading, handleRefresh]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderFooter = useCallback(
    () => <MemoizedFooterComponent count={funnyFacts.length} total={ARTICLES_COUNT} />,
    [funnyFacts.length]
  );

  const mockWarning = useMemo(() => {
    if (!IS_MOCK_DATA) return null;

    return (
      <View style={styles.mockWarning}>
        <Text style={styles.mackWarningTitle}>Oops! You are in MOCK MODE.</Text>
        <Text style={styles.mackWarningText}>
          First, change the mode in the env file.{'\n'}Then, select the AI agent and set its API
          key.
        </Text>
      </View>
    );
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logoIcon}
          resizeMode="cover"
        />
        <View style={styles.titleHolder}>
          <Text style={styles.title}>Funny Facts</Text>
        </View>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshBtn}>
          <Ionicons name={'refresh-circle'} size={36} color={COLORS.GRAYDARK} />
        </TouchableOpacity>
      </View>

      {mockWarning}

      {isLoading ? (
        <FlatList
          data={skeletonData}
          renderItem={renderSkeletonItem}
          keyExtractor={skeletonKeyExtractor}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
          windowSize={WINDOW_SIZE}
          initialNumToRender={INITIAL_NUM_TO_RENDER}
          getItemLayout={getItemLayout}
        />
      ) : (
        <FlatList
          data={funnyFacts}
          renderItem={renderFunnyFact}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
          windowSize={WINDOW_SIZE}
          initialNumToRender={INITIAL_NUM_TO_RENDER}
          getItemLayout={getItemLayout}
          ListFooterComponent={renderFooter}
          disableVirtualization={false}
          legacyImplementation={false}
          updateCellsBatchingPeriod={50}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  listContainer: {
    padding: 16,
  },
  section: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  logoIcon: {
    flex: 0,
    width: 36,
    height: 36,
    borderRadius: 6,
  },
  titleHolder: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: FONTS.BOLD,
    color: COLORS.WHITE,
    textAlign: 'auto',
    marginBottom: 8,
    marginStart: 8,
  },
  refreshBtn: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearFactsBtn: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: 28,
    height: 28,
    borderRadius: 14,
    marginStart: 6,
    marginTop: 4,
  },
  mockWarning: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: COLORS.ERROR,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
  },
  mackWarningTitle: {
    color: COLORS.WHITE,
    fontWeight: FONTS.BOLD,
    fontSize: 16,
    marginBottom: 6,
  },
  mackWarningText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  footerListFYItext: {
    color: COLORS.GRAYDARK,
    textAlign: 'center',
  },
});
