import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const KEY = 'tempImgSorage';

export const tempImgState = atom({
    key: KEY,
    default: {
        bossImg : [],
        contentImg : []
    }
})