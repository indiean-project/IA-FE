import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const category = 'category';


const {persistAtom} = recoilPersist({
    key: category,
    storage: sessionStorage,
});

export const boardPoint = atom({
    key: category,
    default: "",
    effects_UNSTABLE: [persistAtom],
});

