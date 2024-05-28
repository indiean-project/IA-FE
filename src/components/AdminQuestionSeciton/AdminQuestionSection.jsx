import { useEffect, useState } from 'react';
import './AdminQuestionSection.scss';
import FundInputBar from '../FundInputBar';
import SelectBar from '../SelectBar/SelectBar';
import { adminQuestion, updateQuestion } from '../../apis/admin';

function AdminQuestionSection() {

    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'questionDate',
        keyword: ''
    })

    const [ans, setAns] = useState('');

    const [questionList, setQuestionList] = useState([]);
    const [check, setCheck] = useState([]);
    const test = [
        {
            questionNo: 1,
            userNo: 1,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 2,
            userNo: 2,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 3,
            userNo: 3,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 4,
            userNo: 4,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 5,
            userNo: 5,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 6,
            userNo: 6,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 7,
            userNo: 7,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 8,
            userNo: 8,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
        {
            questionNo: 9,
            userNo: 9,
            userId: 'comet2667@naver.com',
            userName: '박혜성',
            questionContent: '이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?이거는 어떻게하나요? 저거는 어떤가요?',
            questionDate: '2024-05-16',
            ansDate: '',
            ansContent: '',
            ansYn: 'N',
        },
    ]

    useEffect(() => {
        getList();
    }, [])

    const getList = async()=>{
        // const list = await adminQuestion();  //연동 완료되면 해당 함수 활성화 후 test를 해당 함수 리턴 값으로
        let checkList = new Array();
        let questionList = new Array();
        for (let i = 0; i < test.length; i++) {
            checkList.push(false);
            questionList.push(test[i])
        }
        setCheck(checkList);
        setQuestionList(questionList)
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
        if (result.status === 'SUCCESS') {
            toast.success('처리가 완료되었습니다.');
        } else {
            toast.error('처리 실패');
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
                    <button>검색</button>
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
                        return (
                            <>
                                <tr key={item.questionNo}  className='question__item'>
                                    <td>{item.questionNo}</td>
                                    <td>{item.userName}</td>
                                    <td onClick={() => onClickViewCheck(idx)}>{item.questionContent.substring(0, 35) + '...'}</td>
                                    <td>{item.questionDate}</td>
                                    <td>{item.ansYn}</td>
                                    <td>{item.ansDate}</td>
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