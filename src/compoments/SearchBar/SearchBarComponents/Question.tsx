import React, { useEffect, useState } from "react";
import { Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import HighlightText from "@sanar/react-native-highlight-text"
import { FlatList, TouchableOpacity } from "react-native"
import API from "../../../api";
import { ISearchQuestion } from "../SearchInterface/ISearchResponse";



const QuestionSearch: React.FC<{search?: string}> = ({search}) => {
    const [data, setData] = useState<ISearchQuestion[]>([])
    useEffect(() => {
        API.SearchQuestion({
            param: search
        }).then(res => res.json()).then(data => setData(data))
    }, [search])

    return(
        <FlatList 
            data={data}
            renderItem={({item}) => (
                <TouchableOpacity >
                    <Stack space={1}>
                        <HighlightText 
                            highlightStyle={{ backgroundColor: 'yellow' }}
                            searchWords={item.param_separation}
                            textToHighlight={item.question}
                        />
                    </Stack> 
                </TouchableOpacity>
            )}
        />
    )
}

export default QuestionSearch