import { API } from "../core"

export const selectAllFund = async(params)=>{
    try {
        const {data} = await API.post('/api/fund/allList?value='
                                        +params.value+
                                        '&sort='+params.sort+
                                        '&standard='+params.standard);
        return data;
    } catch (e){
        console.log(e);
    }
}