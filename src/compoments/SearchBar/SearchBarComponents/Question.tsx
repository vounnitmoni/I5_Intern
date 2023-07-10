import React, { useEffect, useState } from "react";
import { Inline, Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import HighlightText from "@sanar/react-native-highlight-text"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import API from "../../../api";
import { ISearchQuestion } from "../SearchInterface/ISearchResponse";
import { useAppDispatch } from "../../../store/hooks";
import { setQuestionId } from "../../../store/IdReducer";
import { StackActions, useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../enums/RouteEnum";

const QuestionSearch: React.FC<{search?: string}> = ({search}) => {
    const [data, setData] = useState<ISearchQuestion[]>([])
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        API.SearchQuestion({
            param: search
        }).then(res => res.json()).then(data => setData(data))
    }, [search])

    const questionPress = async (id?: number) => {
        dispatch(setQuestionId({question_id: id}))
    }
    return(
        <FlatList 
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.cardContainer} onPress={()=> questionPress(item.id).then(() => navigation.dispatch(StackActions.push(ROUTES.SPECIFIC_QUESTION)))}>
                    <Stack >
                        <HighlightText
                            style={{fontWeight: "700", color: 'black'}} 
                            highlightStyle={{backgroundColor: 'yellow'}}
                            searchWords={item.param_separation}
                            textToHighlight={item.question}
                        />
                        {item.body ? <HighlightText
                            numberOfLines={2} 
                            ellipsizeMode='tail'
                            style={{opacity: 0.7, color: 'black'}} 
                            highlightStyle={{backgroundColor: 'yellow'}}
                            searchWords={item.param_separation}
                            textToHighlight={item.body}
                        /> : null}
                        <Inline alignX={"right"} space={2}>
                            <Text>Vote: {item.vote}</Text>
                            <Text>Answer: {item.answer}</Text>
                        </Inline>
                    </Stack>
                    <View style={styles.lineStyle}/> 
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1
    },
    lineStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        opacity: 0.5
    }
})

export default QuestionSearch