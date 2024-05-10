import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const board = 'board';


const {persistAtom} = recoilPersist({
    key: board,
    storage: sessionStorage,
});

export const boardPoint = atom({
    key: board,
    default: "",
    effects_UNSTABLE: [persistAtom],
});

