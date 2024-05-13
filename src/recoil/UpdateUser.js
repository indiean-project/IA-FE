// 이건 필요한가 아닌가에 대해서는 고민중입니다!!

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const KEY = 'updateUserInfo';
const {persistAtom} = recoilPersist({
    key: KEY,
    storage: sessionStorage,
    // storage: 
});

export const updateUser = atom({
    key: KEY,
    default: {
        userId: '',
        userName: '',
        nickname: '',
        phone: '',
        address: '',
    },
    effects_UNSTABLE: [persistAtom],
});

// 이건 필요한가 아닌가에 대해서는 고민중입니다!!