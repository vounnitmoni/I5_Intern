import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Avatar, Card, Chip, Text} from '@rneui/themed';
import {Columns, Inline, Stack} from '@mobily/stacks';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IPost} from '../../interfaces/IPost';
import moment from 'moment/moment';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import colors from '../../assets/styles/variables/colors';

const Post: React.FC<{post: IPost}> = ({post}) => {
  const [indexItem, setIndexItem] = useState(0);
  const isCarousel = React.useRef(null);
  const renderItem = ({item, index}: any) => {
    return <Image key={index} source={{uri: item}} style={styles.cardImage} />;
  };

  const renderTag = ({item, index}: any) => {
    return (
      <View style={styles.chipTag} key={index}>
        <Chip title={'#' + item} size="sm" color="grey2" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Columns style={{marginBottom: 10}}>
          <Inline space={4}>
            <Avatar size={38} rounded source={{uri: post.avatar}} />
            <Stack space={1}>
              <Text style={styles.accountName}>{post.name}</Text>
              <Text style={styles.postedDate}>
                {moment(post.postedDate).format('MMMM D, YYYY')}
              </Text>
            </Stack>
          </Inline>
          <Stack space={1} align="right">
            <IconFontAwesome5 name={post.type} color={colors.blue} size={38} />
          </Stack>
        </Columns>
        <View>
          <Carousel
            ref={isCarousel}
            data={post.photos}
            renderItem={renderItem}
            sliderWidth={330}
            itemWidth={330}
            onSnapToItem={index => setIndexItem(index)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={post.photos.length}
            activeDotIndex={indexItem}
            carouselRef={isCarousel}
            dotStyle={styles.dot}
            containerStyle={styles.pagination}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        <Text style={styles.textContent}>{post.content}</Text>
        {post.tags && (
          <FlatList
            style={styles.flatListTag}
            data={post.tags}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderTag}
            keyExtractor={item => item}
          />
        )}
        <Inline space={2} alignX="left">
          <IconFeather name="external-link" color={colors.blue} size={26} />
          <IconFeather name="share-2" color={colors.blue} size={26} />
        </Inline>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardImage: {
    padding: 0,
    marginBottom: 10,
    width: 330,
    height: 300,
    resizeMode: 'cover',
  },
  textContent: {
    marginBottom: 10,
  },
  chipMarginBottom: {
    marginBottom: 15,
  },
  postedDate: {
    fontSize: 12,
    color: colors.pinkSwan,
  },
  accountName: {
    fontSize: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    marginVertical: 0,
    backgroundColor: colors.white,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  flatListTag: {
    marginBottom: 10,
  },
  chipTag: {
    paddingRight: 10,
  },
});

export default Post;
