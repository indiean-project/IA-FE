import { useEffect, useState } from 'react';
import { adminReport, adminQuestionSearch } from "../../apis/admin";
import './AdminReportManagement.scss';

function AdminReportManagement() {

    const [questionReport, setQuestionReport] = useState([])

    // const [searchQuestion, setSearchQuestion] = usestate({
    //         keyword: '',
    //         type: '',
    // });

    
    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const result = await adminReport();
        console.log(result);
        if (result.status === "SUCCESS")
            setQuestionReport(result.data);
    }


    const onClickSearch= async()=>{
        console.log(searchQuestion);
        const result = await adminReport(searchReport);
        setQuestionReport(result.data);
        console.result(result);
    }



    const onChangeSearch = (e)=>{
        setQuestionReport({
            ...questionReport,
            [e.target.name]: e.target.value
        })

    }
    return (
        <div>
            <div className="adiminreport__container">

                <h1 className="adminreport___request">신고 관리</h1>
                <div className="adminreport__optionsearch">
                 
                    <select name='type' onChange={(e) => onChangeSearch(e)}>
                        <option value={'1'}>신고 종류</option>
                        <option value={'2'}>신고자</option>
                        <option value={'3'}>신고일</option>
                        <option value={'4'}>신고 글 타입</option>
                        <option value={'5'}>처리상태</option>
                    </select>
                    
                    <input type="" name="" />
                    {/* <input type="text" name="keyword" value={searchQuestion.keyword} onChange={(e) => onChangeSearch(e)} /> */}
                    <button onClick={() => onClickSearch()}>검색</button>
                   
                </div>
                <table className="adminreport__table" border={1}>
                    <thead className="adminreport__tablehead">
                        <tr>
                            <th>No.</th>
                            <th>신고 종류</th>
                            <th>신고 글 타입</th>
                            <th>신고자</th>
                            <th>신고일</th>
                            <th>처리상태</th>
                        </tr>
                    </thead>
                    <tbody className="adminreport__tablebody">
                    
                        {questionReport.map((data, index) => (
                            <tr key={index}>
                                <td>{data.reportNo}</td>
                                <td>{data.reportTypeNo}</td>
                                <td>{data.brType}</td>
                                <td>{data.userNo}</td>
                                <td>{data.reportDate}</td>
                                <td>{data.solveYn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}
export default AdminReportManagement;