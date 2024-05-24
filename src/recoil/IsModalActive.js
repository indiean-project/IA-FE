import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const KEY = 'modalActive';
// const {persistAtom} = recoilPersist({
//     key: KEY,
// });
const {persistAtom} = recoilPersist();

// 모든 모달을 하나의 키로 관리하여 동일 항목에서 똑같은 모달창 오픈시 문제 발생
// => 다른 키 값의 recoil 전역변수 생성해서 관리할 것.
export const isQuestionFormActive = atom({
    key: 'isQuestionFormActive',
    default: false,
    effects_UNSTABLE: [persistAtom],
});


export const isModalActive = atom({
    key: 'modalActive',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// export const isModalActive = atom({
//     key: 'modalActive',
//     default: {
//         login: false,
//         socialLogin : false,
//         fund: false
//         },
//     effects_UNSTABLE: [persistAtom],
// });
