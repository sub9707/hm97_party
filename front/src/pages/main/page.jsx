import React from 'react'
import DefaultPageLayout from '../DefaultPageLayout'
import HeaderSection from '/src/components/mainPage/HeaderSection'
import BodySection from '/src/components/mainPage/BodySection'
import ModalProvider from '/src/components/common/Modal/ModalProvider'

function MainPage() {
  return (
    <DefaultPageLayout>
      <ModalProvider/>
      <HeaderSection/>
      <BodySection />
    </DefaultPageLayout>
  )
}

export default MainPage