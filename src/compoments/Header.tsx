import { Box, Inline } from "@mobily/stacks";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { useAppSelector } from "../store/hooks";

const Header : React.FC = () =>{
    const profile_pic = useAppSelector(state => state.userInfoReducer.profile_pic)
    const name_shortcut = useAppSelector(state => state.userInfoReducer.name_shortcut)
    const navigation = useNavigation()
    return( 
        <View style={styles.container}>
            <View style={styles.inlineContainer}>
                <Inline style={styles.inlineChild1} alignX={"left"} space={2} alignY={'center'}>
                    <TouchableOpacity onPress={()=> navigation.getParent()?.getParent()?.getParent()?.dispatch(DrawerActions.toggleDrawer())}>
                        <Icon name="menu" type="ionicons"/>
                    </TouchableOpacity>
                </Inline>
                <Inline style={styles.inlineChild2} alignX={"right"} space={2} alignY={"center"}>
                    <TouchableOpacity>
                        <Icon name="search"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}>
                        {profile_pic ? (<Image source={{uri: `data:image/jpeg;base64,${profile_pic}`}} style={{width: 27, height: 27, borderRadius: 27/2}}/>) 
                                     : (<Avatar.Text size={27} label={name_shortcut as any}/>)}
                    </TouchableOpacity>
                </Inline>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    inlineContainer:{
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },
    inlineChild1:{

    },
    inlineChild2:{

    }
})

export default Header