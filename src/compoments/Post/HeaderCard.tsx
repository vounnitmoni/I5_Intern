import { Box } from "@mobily/stacks";
import { Icon, Text } from "@rneui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

const HeaderCard : React.FC <{
    community: string;
    communityOnPress?: ()=> void;
    dotsOnPress?: ()=> void;
}> = ({community, communityOnPress, dotsOnPress}) =>{
    return(
        <Box alignX={"between"} direction={"row"}>
            <TouchableOpacity onPress={communityOnPress}>
                <Text style={styles.community}>{community}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={dotsOnPress}>
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