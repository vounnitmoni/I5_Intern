import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import styles from '../../assets/styles';
import API from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { circularClick } from '../../store/onClickRecursiveReducer';
import PostCard from '../../compoments/Post/PostCard';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Support</Text>
    </View>
  );
};

export default SupportScreen;
