import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const KEY = 'modalActive';
const {persistAtom} = recoilPersist({
    key: KEY,
});

export const isModalActive = atom({
    key: KEY,
    default: false,
    effects_UNSTABLE: [persistAtom],
});
