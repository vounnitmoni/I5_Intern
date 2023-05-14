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
    return(
        <ImageSlider 
            data={c as any}
            autoPlay={false}
            closeIconColor="#fff"
            indicatorContainerStyle={{bottom: -15}}
        />
    )
}
export default ImageSlide;