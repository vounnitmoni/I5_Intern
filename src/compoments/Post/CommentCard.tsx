import { Inline, Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import { useEffect, useState } from "react"
import {View, StyleSheet, Dimensions, ScrollView, StyleProp, ViewStyle} from 'react-native'
import BottomOption from './BottomOptionCard'

interface I {
    agoData: number;
    marker: string;
}

const CommentCard : React.FC<{
    ago: number;
    profile?: string;
    username?: string;
    answer: string;
    vote?: number;
    children?: ()=> JSX.Element,
    styleProp?: {
        minusMaxWidth: number;
    };
    style?: StyleProp<ViewStyle>
}> = ({children, styleProp={minusMaxWidth: 5}, ago = 0, answer, profile, username, vote}) =>{
    const [height, setHeight] = useState();
    const [object, setObject] = useState<I>({
        agoData: 0,
        marker: '',
    })
    const onLayout=(event : any)=> {
        const {height} = event.nativeEvent.layout;
        setHeight(height)
    }
    useEffect(()=>{
        if(ago >= 24){
            if(ago >= 30*24){
                if(ago>=365*24){
                    setObject({
                        agoData: Math.trunc(ago/(365*24)),
                        marker: 'y'
                    })
                }else{
                    setObject({
                        agoData: Math.trunc(ago/(30*24)),
                        marker: 'm'
                    })
                }
            }else{
                setObject({
                    agoData : Math.trunc(ago/24),
                    marker: 'd'
                })
            }
        }else{
            setObject({
                agoData: ago,
                marker: 'h',
            })
        }
    },[ago])
    var screen = Dimensions.get("screen").width;
    return(
            <View style={{flex: 1}}>
            <Inline space={2} style={{alignItems: 'flex-end'}}>
                <View style={{width: 1, backgroundColor: '#909090', height: height}}></View>
                <View onLayout={onLayout} style={{width: screen - screen*styleProp.minusMaxWidth/100, alignItems: 'flex-end'}}>
                    <View style={{width: '99%'}}>
                        <Inline space={2}>
                            {profile ? (<Text>{profile}</Text>) : <Text>Profile</Text>} 
                            {username ? (<Text>{username}</Text>) : <Text>Voun Nitmoni</Text>}
                            <Text style={{opacity: 0.5}}>{object.agoData}{object.marker}</Text>
                        </Inline>
                        <View>
                            <Text style={{maxWidth: '95%'}}>
                                   {answer}
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