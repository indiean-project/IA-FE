import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const KEY = 'navHandle';

export const navHandleState = atom({
    key: KEY,
    default: {
        check: false,
        class: 'close',
        style: {
            opacity: 1,
        },
    }
})