import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Overlay } from "@rneui/themed";
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import FollowerScreen from "./FollowModalTopTab/FollowerScreen";
import FollowingScreen from "./FollowModalTopTab/FollowingScreen";

type Visibilty = (arg: boolean) => void;

const FollowModal: React.FC<{
    ModalVisible: Visibilty,
    isVisible: boolean,
}> = ({ModalVisible,isVisible}) =>{

    const onBackDrop = () => {
        ModalVisible(false)
    }

    return(
        <View style={styles.overlayContainer}>
            <Overlay animationType="fade" overlayStyle={styles.overlay} isVisible={isVisible} onBackdropPress={onBackDrop}>
                <FollowingScreen />
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    overlayContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay:{
        width: '88%',
        height: '85%'
    }
    
})

export default FollowModal