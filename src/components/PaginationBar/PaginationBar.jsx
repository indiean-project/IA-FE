import './PaginationBar.scss';
import {cPage} from '../../recoil/page'
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
function PaginationBar({pageInfo,list}) {
    
    
    const [currentPage,setCruuntPage] = useRecoilState (cPage);
    const pageList = ()=>{ 
        let page = []
        
        if (pageInfo !== undefined) {
            for(let i = pageInfo.startPage ; i <= pageInfo.endPage ;i++){
                    page.push(<div className={`${i===currentPage?"currentPage":"otherPage"}`} id={i} onClick={(e)=>{
                        if(currentPage === +e.target.id){
                           return false;
                        }else{
                            setCruuntPage(+e.target.id)
                        }
                        }} >{i}</div>);
            }
        }
        return page;
    }
    useEffect(()=>{
      
        list()
    },[currentPage])

    return (
        <div className='paginationBar'>
            <div className={`${currentPage<=1?"currentPage":"otherPage"}`} onClick={()=>{
                if(currentPage <=1){
                    return false;
                }else{
                    setCruuntPage(currentPage-1)
                }
            }}>&lt;
            </div>
            {pageList()}
            <div className={`${pageInfo !== undefined ? currentPage >= pageInfo.totalPage? "currentPage": "otherPage" :"otherPage"}`} onClick={()=>{
                if(currentPage >= pageInfo.totalPage){
                    return false;
                }else{
                    setCruuntPage(currentPage+1)
                }
            }}>&gt;</div>
        </div>
    )

} export default PaginationBar