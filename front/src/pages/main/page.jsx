import React from 'react'
import DefaultPageLayout from '../DefaultPageLayout'
import HeaderSection from '../../components/mainPage/HeaderSection'
import BodySection from '../../components/mainPage/BodySection'

function MainPage() {
  return (
    <DefaultPageLayout>
      <HeaderSection/>
      <BodySection />
    </DefaultPageLayout>
  )
}

export default MainPage