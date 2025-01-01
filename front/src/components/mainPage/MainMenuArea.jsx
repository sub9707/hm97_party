import React, {useEffect} from 'react'

import styles from './MainMenuArea.module.scss';
import MainMenu from '../common/Buttons/MainMenu';
import testImg from '../../assets/images/test.jpg';
import PartyInfo from '../common/Buttons/PartyInfo';

function MainMenuArea() {

  return (
    <div className={styles.AreaWrapper}>
        <MainMenu title={'갤러리'} route={'/gallery'} text={'이제껏 모은 사진들을 모아 갤러리에 어쩌고'} image={testImg} />
        <MainMenu title={'담벼락'} route={'/comments'} text={'하고싶은 말들 다~털어보자아!'} image={testImg}/>
        <MainMenu title={'롤링페이퍼'} text={'내게 온 롤링페이퍼와 내가 쓰고 싶은 한마디씩'} image={testImg}/>
        <MainMenu title={'롤링페이퍼'} text={'내게 온 롤링페이퍼와 내가 쓰고 싶은 한마디씩'} image={testImg}/>
    </div>
  )
}

export default MainMenuArea