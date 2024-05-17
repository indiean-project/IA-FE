import { useEffect, useState } from 'react';
import { adminQuestion, adminQuestionSearch } from "../../apis/admin";


function AdminQuestionSection() {

    const [questionRequest, setQuestionRequest] = useState([])

    // const [searchQuestion, setSearchQuestion] = usestate({
    //         keyword: '',
    //         type: '',
    // });

    
    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const result = await adminQuestion();
        console.log(result);
        if (result.status === "SUCCESS")
            setQuestionRequest(result.data);
    }


    const onClickSearch= async()=>{
        console.log(searchQuestion);
        const result = await adminQuestionSearch(searchQuestion);
        setQuestionRequest(result.data);
        console.result(result);
    }



    const onChangeSearch = (e)=>{
        setSearchQuestion({
            ...searchQuestion,
            [e.target.name]: e.target.value
        })

    }
    return (
        <div>
            <div className="adiminquestion__container">

                <h1 className="adminquestion___request">문의 사항</h1>
                <div className="adminquestion__optionsearch">
                 
                    <select name='type' onChange={(e) => onChangeSearch(e)}>
                        <option value={'1'}>문의자</option>
                        <option value={'2'}>문의일</option>
                        <option value={'3'}>답변 여부</option>
                    </select>
                    
                    <input type="" name="" />
                    {/* <input type="text" name="keyword" value={searchQuestion.keyword} onChange={(e) => onChangeSearch(e)} /> */}
                    <button onClick={() => onClickSearch()}>검색</button>
                   
                </div>
                <table className="adminquestion__table" border={1}>
                    <thead className="adminquestion__tablehead">
                        <tr>
                            <th>No.</th>
                            <th>문의내용</th>
                            <th>문의자</th>
                            <th>문의일</th>
                            <th>답변여부</th>
                        </tr>
                    </thead>
                    <tbody className="adminquestion__tablebody">
                    
                        {questionRequest.map((data, index) => (
                            <tr key={index}>
                                <td>{data.questionNo}</td>
                                <td>{data.qContent}</td>
                                <td>{data.userNo}</td>
                                <td>{data.qDate}</td>
                                <td>{data.ansYn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}
export default AdminQuestionSection;