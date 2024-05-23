import { useRecoilValue } from "recoil";
import { loginUserState } from "../recoil/LoginUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

function UrlInterceptor({ page }) {
    const loginUser = useRecoilValue(loginUserState);
    const navigate = useNavigate();
    useEffect(() => {
        switch (page) {
            case 'login':
                if (loginUser.userId === '') {
                    toast.error("로그인 후 이용 가능합니다.");
                    navigate('/login', { replace: true });
                }
                break;
            case 'badAccess':
                if (loginUser.userRole != 'ARTIST' || loginUser.userRole != 'ADMIN') {
                    toast.error('잘못된 접근방식입니다.');
                    navigate('/funding', { replace: true });
                }
                break;
        }
    })

    return <></>
}
export default UrlInterceptor;