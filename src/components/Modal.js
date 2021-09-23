import React from 'react'
import styled from '@emotion/styled'

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalContainer = styled.div`
  min-width: 400px;
  position: relative;
  padding: 24px;
  background-color: #fff;
  border-radius: 16px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
`

const Modal = ({ closeModal, title, children }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <Title>{title}</Title>
        {children}
      </ModalContainer>
    </ModalBackground>
  )
}

export default Modal
