import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const KEY = 'userInfo';
const {persistAtom} = recoilPersist({
    key: KEY,
    storage: sessionStorage,
});

export const loginUserState = atom({
    key: KEY,
    default: {
        userId: '',
        userName: '',
        nickName: '',
        phone: '',
        address: '',
    },
    effects_UNSTABLE: [persistAtom],
});
