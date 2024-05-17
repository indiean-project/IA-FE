import { API } from "../core"

 
//******* 펀드 승급요청 관련 api**********// 
// 펀딩 관련 리스트 통신 api
export const adminFund = async() => {
    try {
        const {data} = await API.post("api/admin/fundList");
        return data;
    } catch (e){
        console.log(e);
    }

}

// 펀딩 관련 검색 api
export const adminFundSearch = async(params) => {
    try {
        const {data} = await API.post("api/admin/fundSearch", params);
        return data;
    } catch (e){
        console.log(e);
    }
}


// 펀딩 관련 검색 api
export const adminFundSearchByTitle = async(title) => {
    try {
        const {data} = await API.post("api/admin/fund/title/" + title);
        return data;
    } catch (e){
        console.log(e);
    }
}

// 펀딩 종류별 조회 api
export const searchByfundType = async(type) => {
    try {
        const {data} = await API.post("api/admin/fund/type/" + type);
        return data;
    } catch (e) {
        console.log(e);
    }
}

// 펀딩 처리 상태별 조회 api
export const searchByprocessingStatus = async(status) => {
    try {
        const {data} = await API.post("api/admin/fund/status/" + status);
        return data;
    } catch (e) {
        console.log(e);
    }
}


//******* 문의사항  관련 api**********// 
// 문의사항 관련 리스트 통신 api
export const adminQuestion = async() => {
    try {
        const {data} = await API.post("api/admin/questions");
        return data;
    } catch (e){
        console.log(e);
    }

}

 // 문의사항 관련 검색api
export const adminQuestionSearch = async(params) => {
    try {
        const {data} = await API.post("api/admin/questionSection", params);
        return data;
    } catch (e){
        console.log(e);
    }
}

//******* 신고 관련 api**********// 
export const adminReport = async() => {
    try {
        const {data} = await API.post("api/admin/report");
        return data;
    } catch (e){
        console.log(e);
    }
}