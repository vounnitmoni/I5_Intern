import { Stack } from "@mobily/stacks";
import { Text } from "@rneui/themed"
import { FlatList, TouchableOpacity, View } from "react-native";
import PostCard from "../../../Post/PostCard";

const PostScreen = () =>{
    return(
        <Stack>
            <TouchableOpacity style={{padding: 10}}>
                <Text>Sorting</Text>
            </TouchableOpacity>
            {/* <FlatList 
                data={object}
                renderItem={(item)=>
                    <View style={{paddingBottom: 5}}>
                    <PostCard
                        title={item.item.question}
                        description={item.item.body}
                        community={item.item.community}
                        answer={item.item.answer}
                        vote={item.item.vote}
                        image={item.item.photo}
                        onPress={()=> [setId(item.item.id), navigation.navigate('SpecificQuestionScreen')]}
                        />
                    </View>
                }
            /> */}
        </Stack>
    )
}
export default PostScreen;