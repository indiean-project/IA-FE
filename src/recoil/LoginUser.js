import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const KEY = 'userInfo';
const {persistAtom} = recoilPersist({
    key: KEY,
    storage: sessionStorage,
    // storage: 
});

export const loginUserState = atom({
    key: KEY,
    default: {
        userNo: '',
        userId: '',
        userName: '',
        nickname: '',
        phone: '',
        address: '',
    },
    effects_UNSTABLE: [persistAtom],
});
