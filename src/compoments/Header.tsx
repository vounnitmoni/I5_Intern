import { Box, Inline } from "@mobily/stacks";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon } from "@rneui/base";
import { Image, Text } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Dropdown from "./DropDown";
import Navigator from "./Nagivation/Navigator";
import RightDrawer from "./Nagivation/RightDrawer";
import { RootStackParamList } from "./Nagivation/TypeNavigation";

const Header : React.FC = () =>{
    const {t} = useTranslation();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return( 
        <View style={styles.container}>
            <View style={styles.inlineContainer}>
                <Inline style={styles.inlineChild1} alignX={"left"} space={2}>
                    <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon name="menu" type="ionicons"/>
                    </TouchableOpacity>
                    <Dropdown label="Home" style={{width: 100, height: 30}}/>
                </Inline>
                <Inline style={styles.inlineChild2} alignX={"right"} space={2}>
                    <TouchableOpacity>
                        <Icon name="search"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('./../assets/images/user.png')} style={{width: 25, height: 25, borderRadius: 25/2, borderColor: "black", borderWidth: 1}}/>
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