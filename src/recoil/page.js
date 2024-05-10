import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const Page = 'cPage';



const {persistAtom} = recoilPersist({
    key: Page,
    storage: sessionStorage,
});

export const cPage = atom({
    key: Page,
    default: 1,
    effects_UNSTABLE: [persistAtom],
});





