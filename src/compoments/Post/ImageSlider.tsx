import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";

interface z {
    img : any;
}
interface size{
    width: number,
    height: number,
}

const ImageSlide : React.FC<{
    base64: string[];
}> = ({base64 = []}) =>{
    const [imageSize, setImageSize] = useState<size>()
    const c : z[] = [];
    for(let s = 0; s< base64.length; s++){
        const n : z = {img : `data:image/png;base64,${base64[s]}`}
        c.push(n);
    }
    useEffect(()=>{
        const a = () =>{
            c.forEach(e =>{
                Image.getSize(e.img, (width, height) => {
                    setImageSize({width, height});
                  });
            })
        }
        a();
    },[])
    const i = [
            {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
            {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
            {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
    ]
    return(
        <ImageSlider 
            data={c as any}
            autoPlay={false}
            onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
            indicatorContainerStyle={{bottom: -15}}
        />
    )
}
export default ImageSlide;