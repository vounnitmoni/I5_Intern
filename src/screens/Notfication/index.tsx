import React from 'react';
import {Text} from '@rneui/themed';
import CommentCard from '../../compoments/Post/CommentCard';
import {View} from 'react-native'
const NotificationScreen = () => {
  return (
    <View>
        <CommentCard>
          <CommentCard styleProp={{minusMaxWidth: 15}}>
            <CommentCard styleProp={{minusMaxWidth: 23}}>
              <CommentCard styleProp={{minusMaxWidth: 33}}/>
              <CommentCard styleProp={{minusMaxWidth: 33}}/>
            </CommentCard>
          </CommentCard>
        </CommentCard>
    </View>
  )
};

export default NotificationScreen;
