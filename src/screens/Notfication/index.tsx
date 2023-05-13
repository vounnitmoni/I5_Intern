import React from 'react';
import {Text} from '@rneui/themed';
import CommentCard from '../../compoments/Post/CommentCard';
import {View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Stack } from '@mobily/stacks';
const NotificationScreen = () => {
  return (
    <ScrollView>
      <Stack space={3}>
        <CommentCard>
            <CommentCard ago={2200} styleProp={{minusMaxWidth: 10}}>
            <CommentCard styleProp={{minusMaxWidth: 15}}>
            <CommentCard styleProp={{minusMaxWidth: 20}}>
            <CommentCard styleProp={{minusMaxWidth: 25}}> 
              </CommentCard>
              </CommentCard>
              </CommentCard>
            </CommentCard>
          </CommentCard>
          <CommentCard />
      </Stack>
    </ScrollView>
  )
};

export default NotificationScreen;
