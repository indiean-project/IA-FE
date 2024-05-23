import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { API } from ".";

function ErrorInterceptor() {
    const navigate = useRef(useNavigate());

    useEffect(() => {
        const interceptor = API.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                switch (error.response.data.code) {
                    case 'fund-001':
                        navigate.current('/error');
                        break;
                    case 'artist-001':
                        navigate.current('/error');
                        break;
                }
                return Promise.reject(error);
            }
        );
        return () => {
            API.interceptors.response.eject(interceptor);
        }
    }, []);
}
export default ErrorInterceptor;