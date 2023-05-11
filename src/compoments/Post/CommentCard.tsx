import { Inline, Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import { useState } from "react"
import {View, StyleSheet, Dimensions, ScrollView, StyleProp, ViewStyle} from 'react-native'
import BottomOption from './BottomOptionCard'


const CommentCard : React.FC<{
    children?: React.ReactNode | React.ReactNode[],
    styleProp?: {
        minusMaxWidth: number;
    };
    style?: StyleProp<ViewStyle>
}> = ({children, styleProp={minusMaxWidth: 5}}) =>{
    const [height, setHeight] = useState();
    const onLayout=(event : any)=> {
        const {height} = event.nativeEvent.layout;
        setHeight(height)
    }
    var screen = Dimensions.get("screen").width;
    return(
            <View style={{flex: 1}}>
            <Inline space={2} style={{alignItems: 'flex-end'}}>
                <View style={{width: 1, backgroundColor: '#909090', height: height}}></View>
                <View onLayout={onLayout} style={{width: screen - screen*styleProp.minusMaxWidth/100, alignItems: 'flex-end'}}>
                    <View style={{width: '99%'}}>
                        <Inline space={2}>
                            <Text>Profile</Text>
                            <Text>Voun Nitmoni</Text>
                            <Text style={{opacity: 0.5}}>1d</Text>
                        </Inline>
                        <View>
                            <Text style={{maxWidth: '95%'}}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eos maxime explicabo repudiandae animi est provident, dolorem a molestiae, quas recusandae impedit sint, cumque perferendis. Voluptas quasi corporis accusantium quas.
                            </Text>
                        </View>
                        <View style={{alignItems: 'flex-end', paddingRight: 10}}>
                            <BottomOption vote={undefined} comment={undefined} />
                        </View>
                        {children}
                    </View>
                </View>
            </Inline>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
    },
    wrapper:{
    
    },
    verticalLine:{
        width: 1,
        backgroundColor: '#909090',
        marginLeft: 12
    }
})

export default CommentCard