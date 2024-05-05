import './SignUpStep.scss';

function SignUpStep({onPage}) {

    return(
        <div className="signUpForm__steps">
            <div className={`steps ${onPage === 'form1' ? 'active' : ''}`}>
                <div className="eclipse">1</div><br/>
                <h3>회원정보<br/>조회</h3>
            </div>
            <div className={`steps ${onPage === 'form2' ? 'active' : ''}`}>
                <div className="eclipse">2</div><br/>
                    <h3>추가정보<br/>입력</h3>
            </div>
            <div className={`steps ${onPage === 'form3' ? 'active' : ''}`}>
                <div className="eclipse">3</div><br/>
                <h3>회원가입<br/>완료</h3>
            </div>
        </div>
    );
}

export default SignUpStep;