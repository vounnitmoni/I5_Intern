import { Box, Inline, Stack } from "@mobily/stacks";
import { Icon, Image, Text } from "@rneui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../store/hooks";

const HeaderCard : React.FC <{
    community: string | undefined;
    name: string | undefined;
    ago: number;
    ago_status: string;
    communityOnPress?: ()=> void;
    dotsOnPress?: ()=> void;
    usernameOnPress?: () => void;
}> = ({community, communityOnPress, dotsOnPress, name, ago, ago_status, usernameOnPress}) =>{
    const profile_pic = useAppSelector(state => state.userInfoReducer.profile_pic)

    return(
        <Box alignX={"between"} direction={"row"}>
            <Image source={require('./../../assets/images/test-community-logo.png')} style={{width: 30, height: 30, borderRadius: 30/2}}></Image>
            <Stack style={{width: '80%'}}>
                <TouchableOpacity onPress={communityOnPress}>
                    <Text style={styles.community}>{community}</Text>
                </TouchableOpacity>
                <Inline>
                    <TouchableOpacity onPress={usernameOnPress}>
                        <Text>{name}</Text>
                    </TouchableOpacity>
                    <Text> • </Text>
                    <Text>{ago}{ago_status}</Text>
                </Inline>
            </Stack>
            <TouchableOpacity style={{justifyContent: "center"}} onPress={dotsOnPress}>
                <Icon name="dots-three-vertical" type="entypo"/>
            </TouchableOpacity>
        </Box>
    )
}

const styles = StyleSheet.create({
    community: {
        fontSize: 15,
        fontWeight: "700"
    }
})

export default HeaderCard;  