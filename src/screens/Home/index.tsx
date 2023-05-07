import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import PostCard from '../../compoments/Post/PostCard';
const HomeScreen = () => {

  return (
    <PostCard title='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum arcu id diam ornare ultricies. Phasellus vitae cursus leo. Quisque facilisis porta velit vitae dignissim. Mauris semper lobortis blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. '
      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum arcu id diam ornare ultricies. Phasellus vitae cursus leo. Quisque facilisis porta velit vitae dignissim. Mauris semper lobortis blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. '
      onPress={()=> null}
    /> 
  );
};

export default HomeScreen;
