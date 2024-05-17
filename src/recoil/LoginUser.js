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
        userPwd: '',
        userName: '',
        nickname: '',
        phone: '',
        address: '',
        deleteYn: '',
        reportStatus: '',
        socialStatus: '',
        userProfileImg: '',
        userContent: '',
        userFavoriteArtist: '',
        userFavoriteMusic: ''
    },
    effects_UNSTABLE: [persistAtom],
});
