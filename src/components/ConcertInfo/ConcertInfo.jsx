import './ConcertInfo.scss';
import poster from '../../pages/ConcertDetail/poster.jpg';


function ConcertInfo(){
    return(
        <div className='concert__info__box'>
            <div className='concert__info__item'>
                <div className='concert__info__poster'><img src={poster}/></div>
                <span className='concert__info__text'>
                    🔥나고야 포스트 펑크밴드 6eyes 내한with 소음발광
                    일본 나고야 출신 포스트 펑크 밴드 6eyes가 처음으로 한국에 방문해 작은 투어 공연을 합니다.
                    나고야의 포스트 펑크를 한국에 들려주고자, 함께 공연할 한국의 밴드를 찾던 6eyes는 소음발광에게 DM을 한 통 보내게 됩니다. 6eyes의 음악에 매료된 소음발광은 자신들이 계획 중이던 투어 일정에 6eyes를 초대하게 되고, 밴드가 흔쾌히 수락하면서 이 공연이 성사되었습니다.
                    Joy Division/Fontaines D.C/Deerhunter 등의 밴드들에게 영향을 받아 강렬한 펑크 사운드와 그 사이를 관통하는 아름다운 멜로디로 현재의 포스트 펑크를 풀어내는 소음발광. Gang of Four/P.I.L/CAN 등의 과거의 포스트 펑크, 싸이키델릭에 뿌리를 둔 6eyes. 이들이 함께하는 공연에서 여러분들은 과거, 현재의 포스트 펑크가 만나 표출되는 아름다운 시너지를 느낄 수 있을 것입니다.
                    6eyes의 내한 공연은 2024년 5월 3일 금요일 밤 9시 부산 오방가르드,포스트 펑크 리바이벌 밴드 “칩앤스위트”가 함께 합니다.
                    • 장소 및 일시2024년 5월 3일 금요일 밤 9시 부산 오방가르드
                    입장은 공연 시작 30분 전부터 가능합니다.
                    • 출연진 부산 : 6eyes, 소음발광, 칩앤스위트
                </span>
            </div>
        </div>
    )
}export default ConcertInfo