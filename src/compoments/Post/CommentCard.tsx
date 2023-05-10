import { Inline, Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import { useState } from "react"
import {View, StyleSheet, Dimensions} from 'react-native'


const CommentCard : React.FC<{
    children?: React.ReactNode | React.ReactNode[],
    styleProp?: {
        minusMaxWidth: number;
    };
}> = ({children, styleProp={minusMaxWidth: 5}}) =>{
    const [height, setHeight] = useState();
    const onLayout=(event : any)=> {
        const {height, width} = event.nativeEvent.layout;
        setHeight(height)
    }
    var screen = Dimensions.get("screen").width;
    return(
        <View style={styles.container}>
            <Stack space={3}>
                <Inline space={2}>
                    <View style={[styles.verticalLine, {height : height}]} />
                    <Stack onLayout={onLayout} style={styles.wrapper} space={1} >
                        <Inline space={2}>
                            <Text>Profile</Text>
                            <Text>Voun Nitmoni</Text>
                            <Text style={{opacity: 0.5}}>1d</Text>
                        </Inline>
                        <Text style={{maxWidth: screen - screen*styleProp?.minusMaxWidth/100}}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem sequi temporibus explicabo suscipit obcaecati incidunt facilis ex, expedita cumque commodi maiores accusamus pariatur non architecto culpa perferendis, nisi nam. Alias!
                        </Text>
                        <Inline space={2} alignX={"right"}>
                            <Text>Comment</Text>
                            <Text>Vote</Text>
                            <Text>3Dots</Text>
                        </Inline>
                        <View>
                            {children}
                        </View>
                    </Stack>
                </Inline>
            </Stack>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
    },
    wrapper:{
        paddingLeft: 12
    },
    verticalLine:{
        width: 0.4,
        backgroundColor: '#909090',
        marginLeft: 12
    }
})

export default CommentCard