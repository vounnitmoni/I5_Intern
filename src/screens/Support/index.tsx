import React from 'react';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import styles from '../../assets/styles';
import API from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { circularClick } from '../../store/onClickRecursiveReducer';
import PostCard from '../../compoments/Post/PostCard';

const SupportScreen = () => {
  const {t} = useTranslation();
  const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
  const dispatch = useAppDispatch();
  
  const handleSignOut = () =>{
    
    API.Logout(null).then((res)=>{
      if(res.status == 200){
        AsyncStorage.removeItem("token");
      }
    }).then(()=> {
      if(action){
        dispatch(circularClick(false))
      }else{
        dispatch(circularClick(true))
      }  
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title={t('common.logout')}
        icon={{
          name: 'log-out',
          type: 'feather',
          size: 22,
          color: 'white',
        }}
        size="lg"
        onPress={handleSignOut}
      />
    </View>
  );
};

export default SupportScreen;
