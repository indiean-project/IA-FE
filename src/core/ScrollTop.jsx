import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { tempImgState } from "../recoil/tempImgStorage";
import { imgDelete } from "../apis/imgFilter";

export const ScrollTop = () => {
    const { pathname } = useLocation();
    const tempImg = useRecoilValue(tempImgState);

    useEffect(()=>{
        window.scrollTo(0, 0);
        let list = new Array();
        tempImg.bossImg.filter((item)=> item != '').forEach((item)=>{
            list.push(item);
        });
        list.length != 0 && imgDelete(list);
        tempImg.contentImg.length != 0 && imgDelete(tempImg.contentImg);
    }, [pathname])
}