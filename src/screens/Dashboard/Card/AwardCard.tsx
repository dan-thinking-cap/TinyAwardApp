import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import Clear from '../../../assets/icons/clear.svg';
import Icon from '../../../assets/icons/search.svg';
import Verified from '../../../assets/icons/verfiedLogo.svg';
import PrimaryGradientButton from '../../../components/GradientButton/PrimaryGradientButton';
import SampleTestData from '../../../components/SampleTestData';
import colors from '../../../global/colors';
import { height, width } from '../../../global/fonts';
import screenNames from '../../../global/screenNames';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import useSpinners from '../../../hooks/useSpinners';
import { getAwardList } from '../../../store/thunk/dashbaord';
import { styles } from './Styles';

const AwardCard = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [data, setData] = useState<any>(
    process.env.JEST_WORKER_ID ? [SampleTestData?.sampleListData] : [],
  );
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalpages] = useState<number>(1);
  const [isSearch, setIsSearch] = useState(false);
  const { addOneSpinner, removeOneSpinner } = useSpinners();
  const [show, setShow] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const listRef = useRef<any>(null);

  useEffect(() => {
    handleSearch(search, page);
  }, [page]);

  function handleHtmlTxt(html: any) {
    return html
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
  async function handleSearch(searchKey: string, pageNumber: number) {
    setShow(false);
    addOneSpinner();
    const request = {
      search: searchKey?.trim(),
      order: 'ascending',
      sortBy: 'createdDate',
      issuers: ['all'],
      alignments: ['all'],
      badgeType: ['all'],
      page: pageNumber,
    };
    try {
      const { response, error } = await getAwardList(request);
      if (response?.Badges) {
        setTotalpages(response?.TotalBadges);
        setCount(prev => prev + response?.Badges?.length);
        setData((prev: any) => [...prev, ...response?.Badges]);
      }
    } catch (error) {
    } finally {
      if (!process.env.JEST_WORKER_ID) {
        setShow(true);
      }
      removeOneSpinner();
    }
  }
  const handleEndReached = () => {
    if (count < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const renderItem = ({ item, index }) => {
    function handleExtension() {
      navigation.navigate(screenNames.awardDetails, {
        data: item,
        screen: screenNames.dashboard,
      });
    }
    function handleInfo() {
      navigation.navigate(screenNames.infoDetails, { data: item });
    }
    return (
      <View
        style={styles.cardContainer}
        testID="awardCard"
        accessibilityLabel="awardCard"
        key={index}>
        <View style={styles.topWrapper}>
          {item?.Isverified ? (
            <Verified
              testID="verifiedButton"
              accessibilityLabel="verifiedButton"
            />
          ) : (
            <View />
          )}
          {/* <Star testID="starLogo" accessibilityLabel="starLogo" /> */}
        </View>
        <View>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item?.Image }}
              style={styles.imageLogo}
              testID="awardLogo"
              accessibilityLabel="awardLogo"
            />
            {/* <Image
              source={{uri: item?.Image}}
              style={styles.imageLogo}
              testID="awardLogo"
              accessibilityLabel="awardLogo"
            /> */}
          </View>
          <View style={styles.textWrapper}>
            <Text
              style={styles.issueTxt}
              testID="issueTag"
              accessibilityLabel="issueTag">
              {strings.issuer}
              <Text
                style={styles.issueName}
                testID={'name'}
                accessibilityLabel={'name'}>
                {item?.IssuerName}
              </Text>
            </Text>
            <Text
              style={styles.titleTxt}
              testID={'title'}
              accessibilityLabel={'title'}>
              {item?.BadgeName}
            </Text>
            <Text
              style={styles.descriptionTxt}
              testID={'description'}
              accessibilityLabel={'description'}
              numberOfLines={3}>
              {handleHtmlTxt(item?.BadgeDescription)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.bottomWrapper}>
            <PrimaryGradientButton
              title={strings.info}
              style={styles.buttonWrapper}
              textStyle={styles.buttonTxt}
              textId="infoButton"
              titleId="infoText"
              onPress={handleInfo}
            />
            {item?.IssuedOnDate || item?.UserID ? (
              <View style={styles.buttonWrapper}>
                <Text
                  style={styles.buttonTxt}
                  accessibilityLabel="earned"
                  testID="earned">
                  {strings.earned}
                </Text>
              </View>
            ) : (
              <PrimaryGradientButton
                title={strings.go}
                style={styles.buttonWrapper}
                textStyle={styles.buttonTxt}
                textId="go"
                titleId="goText"
                isBlue={true}
                onPress={handleExtension}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  function handleNoData() {
    return (
      show && (
        <View>
          <Text style={styles.noBadges}>{strings?.noBadgesList}</Text>
        </View>
      )
    );
  }

  const filterData = data?.filter((item: any) => {
    return item?.Type?.toLowerCase() !== 'watch';
  });
  function resetPages() {
    setData([]);
    setPage(1);
    setCount(1);
    setTotalpages(1);
    searchRef?.current?.blur();
  }
  function handleSearchData() {
    if (search) {
      listRef?.current?.scrollToOffset({ offset: 0, animated: true });
      setIsSearch(true);
      resetPages();
      handleSearch(search, page);
    }
  }
  function clearSearch() {
    listRef?.current?.scrollToOffset({ offset: 0, animated: true });
    setSearch('');
    resetPages();
    handleSearch('', page);
    setIsSearch(false);
  }

  return (
    <View style={styles.flex}>
      <View style={styles.searchWrapper}>
        <TextInput

          value={search}
          placeholderTextColor={colors.black}
          placeholder={strings.search}
          testID="searchInput"
          ref={searchRef}
          accessibilityLabel="searchInput"
          style={styles.searchContainer}
          onChangeText={setSearch}
          selectionColor='#000'

        />
        <View
          style={styles.searchIcon}
          testID="searchIcon"
          accessibilityLabel="searchIcon">
          {isSearch ? (
            <Pressable
              onPress={clearSearch}
              testID="ClearIcon"
              accessibilityLabel="ClearIcon">
              <Clear height={height(30)} width={width(30)} />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleSearchData}
              testID="searchLogo"
              accessibilityLabel="searchLogo">
              <Icon height={height(20)} width={width(20)} />
            </Pressable>
          )}
        </View>
      </View>
      <FlatList
        data={filterData}
        renderItem={renderItem}
        key={filterData?.length === 0 && filterData}
        keyExtractor={(item, index) => item + index}
        ref={listRef}
        testID="flatList"
        bounces={false}
        accessibilityLabel="flatList"
        style={styles.flex}
        contentContainerStyle={styles.listContainerWrapper}
        onEndReached={count > 1 ? handleEndReached : null}
        onEndReachedThreshold={0.5}
        refreshing={true}
        ListEmptyComponent={handleNoData}
      />
    </View>
  );
};

export default AwardCard;
