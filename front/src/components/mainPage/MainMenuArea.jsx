import React, {useEffect} from 'react'

import styles from './MainMenuArea.module.scss';
import MainMenu from '../common/Buttons/MainMenu';
import testImg from '../../assets/images/test.jpg';
import axiosInstance from '../../api/axios';

function MainMenuArea() {

  return (
    <div className={styles.AreaWrapper}>
        <MainMenu title={'메뉴 버튼 테스트'} text={'메뉴버튼 테스트를 위한 텍스트 입력입니다. 메뉴버튼 테스트를 메뉴버튼 테스트를 위한 텍스트 입력입니다.'} image={testImg} disabled/>
        <MainMenu title={'메뉴 버튼 테스트'} text={'메뉴버튼 테스트를 위한 텍스트 입력입니다. 메뉴버튼 테스트를 메뉴버튼 테스트를 위한 텍스트 입력입니다.'} image={testImg}/>
        <MainMenu title={'메뉴 버튼 테스트'} text={'메뉴버튼 테스트를 위한 텍스트 입력입니다. 메뉴버튼 테스트를 메뉴버튼 테스트를 위한 텍스트 입력입니다.'} image={testImg}/>
        <MainMenu title={'메뉴 버튼 테스트'} text={'메뉴버튼 테스트를 위한 텍스트 입력입니다. 메뉴버튼 테스트를 메뉴버튼 테스트를 위한 텍스트 입력입니다.'} image={testImg}/>
    </div>
  )
}

export default MainMenuArea