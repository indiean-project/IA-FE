import Bootpay from "@bootpay/client-js";
import { API } from "../../core"
import { Navigate } from "react-router-dom";

export const selectAllFund = async (params) => {
    try {
        const { data } = await API.post('/api/fund/allList', params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const selectSoonFund = async () => {
    try {
        const { data } = await API.post('/api/fund/soonList');
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const selectFundDetail = async (param) => {
    try {
        const { data } = await API.get('/api/fund/detail?fundNo=' + param);
        return data;
    } catch (e) {
        console.log(e);
        
    }
}

export const getBillingKey = async (params) => {
    try {
        const billing = await Bootpay.requestSubscription(params)
        return billing;
    } catch (e){
        return e;
    }
    
}

export const payReserve = async (params) => {
    try {
        const { data } = await API.post('/api/fund/order', params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const fundEnroll = async (params) => {
    try {
        const { data } = await API.post('/api/fund/enroll', params);
        return data;
    } catch (e) {
        console.log(e)
    }
}