import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Text } from "@rneui/themed"
import { View } from "react-native"

const Header = () =>{
    return(
        <Stack space={1}>
            <View style={{backgroundColor: 'blue'}}>
                <Columns paddingLeft={6} paddingRight={6} paddingTop={5} alignY={"center"}>
                    <Column>
                        <View style={{height: 80, width: 80, borderRadius: 40, backgroundColor: 'red'}}></View>
                    </Column>
                    <Column>
                        <Inline space={2} alignX={"right"}>
                            <Text>Bell</Text>
                            <Text>Follow</Text>
                        </Inline>
                    </Column>
                </Columns>
            </View>
            <Stack paddingLeft={6} paddingRight={6}>
                <Text>Follower</Text>
                <Text ellipsizeMode="tail"
                      numberOfLines={2}  
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, asperiores! Nisi tenetur, dolorem labore dolor consequatur exercitationem animi eaque dicta! Eligendi odio iste porro sequi aliquam quas nobis aut dicta.</Text>
            </Stack>
        </Stack>
    )
}

export default Header