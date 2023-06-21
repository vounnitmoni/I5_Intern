import { LegacyRef, useEffect, useState } from "react"
import { FlatList, ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet"
import API from "../../api";
import { Inline } from "@mobily/stacks";
import { Text } from "@rneui/themed";
import { Checkbox } from "react-native-paper";

interface IProps{
    rbRef: LegacyRef<RBSheet>
    backPress?: () => void;
    nameValue: string[];
    setNameValue: () => string[];
}

interface ICategoryList {
    id: number;
    name: string;
}

interface ICategoryListWithCheckStatus extends ICategoryList{
    checked: boolean;
}

const CategoryBottomSheet: React.FC<IProps> = ({
    rbRef,
    backPress,
    nameValue,
    setNameValue,
}) =>{
    const [id, setId] = useState<number[]>([])
    const [request_time, setRequest_time] = useState(0)
    const [data, setData] = useState<ICategoryList[]>([])
    const [name, setName] = useState<String[]>([])
    const [dataWithCheck, setDataWithCheck] = useState<ICategoryListWithCheckStatus[]>([])

    useEffect(()=>{
        const test = () => API.ListOfCategories(request_time, id).then(res => res.json())
            .then(res => setData(res))
            .catch(e => (e as Error).message);
        test();
    },[request_time])

    useEffect(()=>{
        Array.from(data).forEach(e =>{
            setDataWithCheck(prev => [...prev, {
                checked: false,
                id: e.id,
                name: e.name,
            }])
        })
    },[data])
    const loadMoreData = () =>{

    }


    const onCheck = async (item: ICategoryListWithCheckStatus, index: number) =>{
        setDataWithCheck([...dataWithCheck.map((item, i) =>
                   i === index ? { ...item, checked: !item.checked} : item
                 ),
               ]);
       }
    return(
        <RBSheet ref={rbRef} 
                 closeOnPressBack={true}
                 closeOnPressMask={true}
                 closeOnDragDown={true}
                 >
            <FlatList 
                data={dataWithCheck}
                renderItem={({item, index} : {item: ICategoryListWithCheckStatus, index: number}) => 
                    <Inline alignX={"between"} alignY={'center'} paddingLeft={3} paddingRight={3}>
                        <Text style={{fontSize: 15, fontWeight: '700'}}>{item.name}</Text>
                        <Checkbox
                            status={ item.checked ? 'checked' : 'unchecked' }
                            onPress={()=> onCheck(item, index).then(()=>{
                                if(!item.checked){
                                    setName(prev => [
                                        ...prev,
                                        item.name
                                    ])
                                }else{
                                    setName(current => current.filter(e => e !== item.name))
                                }
                            }).then(()=> setNameValue(name))}
                        />
                    </Inline>
                }
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </RBSheet>
    )
}
export default CategoryBottomSheet