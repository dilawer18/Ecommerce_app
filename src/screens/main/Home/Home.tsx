import HeaderComp from '@/components/HeaderComp';
import ProductCard from '@/components/ProductCard';
import { HomeShimmer, ShimmerBox } from '@/components/Shimmers';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useTheme } from '@/context/ThemeContext';
import {
  getCategoriesCache,
  getProductsCache,
  saveCategoriesCache,
  saveProductsCache,
} from '@/data/productCache';
import useIsRTL from '@/hooks/useIsRTL';
import * as homeActions from '@/redux/actions/home';
import { RootState } from '@/redux/reducers';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { Colors, commonColors } from '@/styles/colors';
import { debounce } from '@/utils/debounce';
import { isNetworkAvailable } from '@/utils/network';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Pressable,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ProductsResponse } from './home.types';
import useRTLStyles from './styles';

const LIMIT = 10;

const Home = ({ navigation }: any) => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const { theme } = useTheme();
  const styles = useRTLStyles(isRTL, theme);
  const colors = Colors[theme];
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const favouriteItems = useSelector(
    (state: RootState) => state.favourites.items,
  );
  const { registeredUsers } = useSelector((state: RootState) => state.auth);

  const userName = useMemo(() => {
    return registeredUsers?.length ? registeredUsers[0]?.fullName : 'User';
  }, [registeredUsers]);

  const fetchCategories = async () => {
    try {
      const cachedCategories = await getCategoriesCache();
      if (cachedCategories && cachedCategories.length > 0) {
        setCategories([{ slug: 'All', name: 'All' }, ...cachedCategories]);
      }

      const isOnline = await isNetworkAvailable();
      if (!isOnline) {
        setIsOffline(true);
        return;
      }

      const response = (await homeActions.getCategories()) as unknown as any[];
      if (response && Array.isArray(response)) {
        const nextCategories = [{ slug: 'All', name: 'All' }, ...response];
        setCategories(nextCategories);
        await saveCategoriesCache(response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      const cachedCategories = await getCategoriesCache();
      if (cachedCategories && cachedCategories.length > 0) {
        setCategories([{ slug: 'All', name: 'All' }, ...cachedCategories]);
      }
      setIsOffline(true);
    }
  };

  const fetchProducts = async (
    currentSkip = 0,
    isRefresh = false,
    category = selectedCategory,
    search = searchQuery,
  ) => {
    if (!isRefresh) {
      if (currentSkip === 0) setLoading(true);
      else setLoadingMore(true);
    }

    try {
      const cachedProducts = await getProductsCache();
      if (cachedProducts && cachedProducts.length > 0 && currentSkip === 0) {
        setProducts(cachedProducts);
      }

      const isOnline = await isNetworkAvailable();
      if (!isOnline) {
        setIsOffline(true);
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
        return;
      }

      let response: any;
      const queryParam = `?limit=${LIMIT}&skip=${currentSkip}`;

      if (search.trim() !== '') {
        response = await homeActions.searchProducts(
          `?q=${search}&limit=${LIMIT}&skip=${currentSkip}`,
        );
      } else if (category !== 'All') {
        response = await homeActions.getProductsByCategory(
          category,
          queryParam,
        );
      } else {
        response = await homeActions.getProducts(queryParam);
      }

      const data = response as ProductsResponse;

      if (data && data.products) {
        if (currentSkip === 0) {
          setProducts(data.products);
        } else {
          setProducts(prev => [...prev, ...data.products]);
        }
        setTotal(data.total);
        setSkip(currentSkip + LIMIT);
        await saveProductsCache(data.products);
      }
      setIsOffline(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      const cachedProducts = await getProductsCache();
      if (cachedProducts && cachedProducts.length > 0) {
        setProducts(cachedProducts);
      }
      setIsOffline(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(0, false, 'All', '');
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(0, true, selectedCategory, searchQuery);
  };

  const loadMore = () => {
    if (!loadingMore && products.length < total) {
      fetchProducts(skip, false, selectedCategory, searchQuery);
    }
  };

  const debouncedFetchProducts = useCallback(
    debounce((skipVal: number, isRef: boolean, cat: string, search: string) => {
      fetchProducts(skipVal, isRef, cat, search);
    }, 500),
    [],
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setSkip(0);
    debouncedFetchProducts(0, false, selectedCategory, text);
  };

  const onSubmitSearch = () => {
    setSkip(0);
    fetchProducts(0, false, selectedCategory, searchQuery);
  };

  const selectCategory = (category: any) => {
    const catSlug = typeof category === 'string' ? category : category.slug;
    setSelectedCategory(catSlug);
    setSearchQuery('');
    setSkip(0);
    fetchProducts(0, false, catSlug, '');
  };

  const onPressCard = (item: Product) => {
    navigation.navigate('ProductDetails', { product: item });
  };

  const onToggleFav = (item: Product) => {
    dispatch(toggleFavourite(item));
  };

  const renderProductCard = useCallback(
    ({ item, index }: { item: Product; index: number }) => {
      const isFav = favouriteItems.some(fav => fav.id === item.id);
      return (
        <ProductCard
          item={item}
          index={index}
          onPress={() => onPressCard(item)}
          isFavourite={isFav}
          onToggleFavourite={() => onToggleFav(item)}
        />
      );
    },
    [favouriteItems, onPressCard],
  );

  const LeftComponent = useCallback(() => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextComp
          style={styles.leftComponentText}
          text={`${t('WELCOME')} ${userName}`}
        />
      </TouchableOpacity>
    );
  }, [userName, isRTL, theme]);

  const renderCategory = ({ item }: { item: any }) => {
    const isSelected =
      selectedCategory === (typeof item === 'string' ? item : item.slug);
    const displayName = typeof item === 'string' ? item : item.name;

    return (
      <Pressable
        style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
        onPress={() => selectCategory(item)}
      >
        <TextComp
          text={displayName}
          isDynamic
          style={[
            styles.categoryText,
            isSelected && styles.categoryTextSelected,
          ]}
        />
      </Pressable>
    );
  };

  return (
    <WrapperContainer style={styles.container} edges={['top']}>
      <HeaderComp
        showBack={false}
        leftComponent={<LeftComponent />}
        // title={t('PRODUCTS')}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('SEARCH')}
          placeholderTextColor={colors.inputPlaceholder}
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={onSubmitSearch}
          returnKeyType="search"
        />
      </View>

      <View>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item, index) =>
            typeof item === 'string' ? item : item.slug || index.toString()
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          inverted={isRTL}
        />
      </View>

      {isOffline && (
        <View style={styles.offlineBanner}>
          <TextComp
            isDynamic
            text="Offline mode — showing saved data"
            style={styles.offlineText}
          />
        </View>
      )}

      {loading && products.length === 0 ? (
        <HomeShimmer />
      ) : products.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TextComp
            isDynamic
            text={t('NO_RESULTS_FOUND')}
            style={{ fontSize: 16, color: colors.text }}
          />
        </View>
      ) : (
        <Fragment>
          <FlatList
            data={products}
            renderItem={renderProductCard}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[commonColors.primary]}
                tintColor={commonColors.primary}
              />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.footerLoader}>
                  <ShimmerBox style={styles.footerShimmer} />
                </View>
              ) : null
            }
          />
        </Fragment>
      )}
    </WrapperContainer>
  );
};

export default Home;
