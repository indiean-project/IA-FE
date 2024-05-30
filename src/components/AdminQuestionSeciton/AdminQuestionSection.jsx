import { useEffect, useState } from 'react';
import './AdminQuestionSection.scss';
import FundInputBar from '../FundInputBar';
import SelectBar from '../SelectBar/SelectBar';
import { adminQuestion, updateQuestion, searchQuestionApprovalList } from '../../apis/admin';
import toast from 'react-hot-toast';

function AdminQuestionSection() {

    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'questionDate',
        keyword: ''
    })

    const [ans, setAns] = useState('');

    const [questionList, setQuestionList] = useState([]);
    const [check, setCheck] = useState([]);   

    useEffect(() => {
        getList();
    }, [])

    const getList = async()=>{
        const list = await adminQuestion();  //연동 완료되면 해당 함수 활성화 후 test를 해당 함수 리턴 값으로
        let checkList = new Array();
        console.log(list)
        if(list.status === 'SUCCESS'){
            for (let i = 0; i < list.data.length; i++) {
                checkList.push(false);
            }
            setCheck(checkList);
            setQuestionList(list.data)
        }
            
    }

    const searchCategory = [
        { label: '전체', value: 'all' },
        { label: '문의번호', value: 'questionNo' },
        { label: '문의자명', value: 'userName' },
        { label: '문의내용', value: 'questionContent' },
    ]
    const sortCategory = [
        { label: '문의일', value: 'questionDate' },
        { label: '답변일', value: 'ansDate' },
        { label: '처리상태', value: 'ansYn' },
    ]

    const onChangeKeyword = (e) => {
        setStandard({
            ...standard,
            [e.target.name]: e.target.value
        })
    }

    
    const onChangeSearchStandard = (item) => {
        setStandard({
            ...standard,
            searchValue: item
        })
    }

    const onChangeSortStandard = (item) => {
        setStandard({
            ...standard,
            sortValue: item
        })
    }

    const onClickViewCheck = (idx) => {
        setCheck(prevCheck => {
            const updatedCheck = [...prevCheck];
            updatedCheck[idx] = true;
            return updatedCheck;
        })
    }

    const onClickCloseViewCheck = (idx) => {
        setCheck(prevCheck => {
            const updatedCheck = [...prevCheck];
            updatedCheck[idx] = false;
            return updatedCheck;
        });
        setAns('');
    }

    const onClickAnsUpdate = async (item) => {
        console.log(ans);
        console.log(item);
        const result = await updateQuestion({
            ansContent: ans,    //답변 내용
            questionNo: item.questionNo //업데이트할 문의 번호
        });
        console.log(result)
        if (result.status === 'SUCCESS') {
            toast.success('처리가 완료되었습니다.');
        } else {
            toast.error('처리 실패');
        } 
        getList();
      
    }
    const onClickSearch = async() => {     
        console.log(standard);
        const list = await searchQuestionApprovalList(standard);
        if (list.status === 'SUCCESS'){
            setQuestionList(list.data);
            toast.success('총' + list.data.length + '건의 검색 결과');
        } else {
            toast.error('검색 실패');
        }
    }

    return (
        <div className="adminFundingApproval__container">
            <div className="adminFundingApproval__header">
                <div className="adminFundingApproval__search">
                    <FundInputBar
                        width={'300px'}
                        paddingLeft={'5px'}
                        value={standard.keyword}
                        onChangeValue={onChangeKeyword}
                        name={'keyword'}
                    />
                    <SelectBar
                        list={searchCategory} onChangeValue={onChangeSearchStandard}
                    />
                    <button onClick={()=> onClickSearch()}>검색</button>
                </div>
                <div className="adminFundingApproval__sort">
                    <p>정렬</p>
                    <SelectBar
                        list={sortCategory} onChangeValue={onChangeSortStandard}
                    />
                </div>
            </div>

            <table className="admin__table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>문의자</th>
                        <th>문의 내용</th>
                        <th>문의 날짜</th>
                        <th>처리 상태</th>
                        <th>답변 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {questionList.map((item, idx) => {
                        console.log(item)
                        return (
                            <>
                                <tr key={item.questionNo}  className='question__item'>
                                    <td>{item.questionNo}</td>
                                    <td>{item.userName}</td>
                                    <td onClick={() => onClickViewCheck(idx)}>{item.questionContent.substring(0, 35) + '...'}</td>
                                    <td>{item.questionDate}</td>
                                    <td>{item.ansYn}</td>
                                    <td>{item.answerDate}</td>
                                </tr>
                                {check[idx] && <tr>
                                    <td colSpan={6}>
                                        <div className='question__detail'>
                                            <div>문의자명 : {item.userName}</div>
                                            <div>문의자ID : {item.userId}</div>
                                            <div>
                                                <h3>문의내용</h3>
                                                <div className='question__detail__content'>{item.questionContent}</div>
                                            </div>
                                            <div>
                                                <h3>답변내용</h3>
                                                <div className='question__detail__content'>
                                                    {item.ansContent === '' || item.ansContent === null ?
                                                        <><textarea onChange={(e) => setAns(e.target.value)}>{ans}</textarea></> : item.ansContent}
                                                </div>
                                            </div>
                                            {item.ansContent === '' || item.ansContent === null ? 
                                            <><button onClick={() => onClickAnsUpdate(item)}>답변 등록</button><button onClick={() => onClickCloseViewCheck(idx)}>닫기</button></> :
                                            <></>}
                                        </div>
                                    </td>
                                </tr>}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default AdminQuestionSection;