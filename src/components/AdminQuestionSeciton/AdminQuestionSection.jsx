

function AdminQuestionSection(){

    return(
        <div>
            <br/><br/><br/><br/>
            <h1>문의사항 리스트</h1>
            <select>
                <option>작성자</option>
                <option>제목</option>
                <option>내용</option>
            </select>
            <input type="text" name="keyowrd" value=""/>
            <button type="submit">검색</button>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>                      
                        <th>제목</th>
                        <th>내용</th>
                        <th>작성자</th>
                    </tr>                    
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    );


}
export default AdminQuestionSection;