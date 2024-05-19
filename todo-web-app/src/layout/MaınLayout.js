import React from 'react'
import { Container } from 'react-bootstrap'
import MainHeader from './MainHeader'

const MaınLayout = ({children}) => {

  return (
    <><MainHeader />
    
    <Container  className='mt-4' >
      {/* <Home></Home> */}
          {children}
      </Container></>
  )
}

export default MaınLayout