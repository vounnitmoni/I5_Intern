import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Icon, Text } from "@rneui/themed"
import { StyleSheet, View } from "react-native"
import { ROUTES } from "../../enums/RouteEnum"
import HomeScreen from "../../screens/Home"

const IRightDrawerMenu = [
    {
        name: ROUTES.HOME,
        label: 'Home',
        type: 'ionicon',
        icon: 'md-home-outline',
    },
    {
        name: ROUTES.PROFILE,
        label: 'Profile',
        type: 'ionicon',
        icon: 'md-person-outline',
    },
    {
        name: ROUTES.BOOKMARK,
        label: 'Bookmarks',
        type: 'ionicon',
        icon: 'bookmark-outline',
    },
    {
        name: ROUTES.SETTING,
        label: 'Settings',
        type: 'ionicon',
        icon: 'md-settings-outline',
    }
]

const RightDrawerContent = (props: any) =>{
    return(
        <Stack style={styles.container} space={3}>
            <Columns style={styles.profile}>
                <Column>
                    {/* profile */}
                </Column>
                <Column>
                    {/* profile info */}
                </Column>
            </Columns>
            <Inline>
                {/* following */}
            </Inline>
            <Stack space={5}>
                {IRightDrawerMenu.map((item, index) =>{
                    return(
                        <Inline style={{justifyContent: 'center'}}>
                            <Icon name={item.icon} type={item.type}/>
                            <Text>{item.label}</Text>
                        </Inline>
                    )
                })}
            </Stack>
        </Stack>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 50,
        marginLeft: 15,
    }, 
    profile:{
        width:25,
    }
})
export default RightDrawerContent