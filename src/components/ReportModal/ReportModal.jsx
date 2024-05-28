import { useState } from "react";
import ModalWindow from "../ModalWindow";
import "./ReportModal.scss";
import toast from "react-hot-toast";
import { ReportEnroll } from "../../apis/report/report";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../recoil/LoginUser";

function ReportModal(props) {
    const [reportType, setReportType] = useState("");
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);

    const report = async () => {
        const result = await ReportEnroll({
            member: {
                userNo: loginUser.userNo,
            },
            reportTypeNo: reportType,
            contentNo: props.contentNo,
            brType: props.brType
        })
        if(result.status === "SUCCESS") {
            props.setModal(false);
            toast.success("신고가 접수 되었습니다.");
        }
    }

    return (
        <ModalWindow>
            <div className="reportModal__container">
                <div className='reportModal__header'>
                    <h3>신고</h3>
                </div>
                <hr />
                <div className='reportModal__info'>
                    <p>신고 항목을 선택 해 주세요.</p>
                </div>
                <div className='reportModal__content'>
                    <div className="report__option__item" onClick={()=>{setReportType("HEOWI")}}>
                        <div>허위사실을 유포하였습니다.</div>
                        <div><input type="radio" checked={reportType === "HEOWI"}/></div>
                    </div>
                    <div className="report__option__item" onClick={()=>{setReportType("MYUNGYE")}}>
                        <div>명예훼손을 하였습니다.</div>
                        <div><input type="radio" checked={reportType === "MYUNGYE"}/></div>
                    </div>
                    <div className="report__option__item" onClick={()=>{setReportType("YOK")}}>
                        <div>해당 내용에 욕설이 포함되어 있습니다.</div>
                        <div><input type="radio" checked={reportType === "YOK"}/></div>
                    </div>
                    <div className="report__option__item" onClick={()=>{setReportType("AD")}}>
                        <div>해당 내용이 광고입니다.</div>
                        <div><input type="radio" checked={reportType === "AD"}/></div>
                    </div>
                    <div className="report__option__item" onClick={()=>{setReportType("GUITAR")}}>
                        <div>기타</div>
                        <div><input type="radio" checked={reportType === "GUITAR"}/></div>
                    </div>
                </div>
                <div className='report__select__box'>
                    <div className='report__select__btn'>
                        <div onClick={()=>{reportType !== "" ? report() : toast.error("신고 항목을 선택 해 주세요.")}}>신고</div>
                        <div onClick={()=>{props.setModal(false)}}>취소</div>
                    </div>
                </div>
            </div>
        </ModalWindow>
    )
} export default ReportModal;