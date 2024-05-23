import './UserFavorite.scss'

function UserFavorite({editAccount, doEdit, onChangeUserInfo, onDoEdit}) {

    return (
        <>
            <div className="favorite">
                {/* 선호 아티스트 및 음악 등록란 :: spotify 키 필요, <UserFavorite /> */}
                <h3>Favorite</h3>
                <div>
                    <div className="fav__artist">
                        <div className="fav__img">
                            <img src={editAccount.userFavoriteArtist} alt="xx" />
                        </div>
                        <p>{editAccount.userFavoriteArtist}아티스트명</p>
                    </div>
                    <br />
                    <div className="fav__music">
                        <div className="fav__img">
                            <img src={editAccount.userFavoriteMusic} alt="xx" />
                        </div>
                        <p>{editAccount.userFavoriteMusic}음악제목</p>
                        <br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserFavorite;