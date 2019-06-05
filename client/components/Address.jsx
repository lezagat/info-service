import React from 'react';
import styled from 'styled-components';
import CompContainer from './CompContainer';

const Container = styled.div`
  letter-spacing: .013em;
  display: flex;
  justify-content: flex-start;
  color: #101820;

  &:hover {
    color: #b70038;
  }
`;

const Icon = styled.img`
  padding-right: 24px;
  padding-left: 3px;
  width: 19px;
`;

const AddressText = styled.span`
  margin-top: 3px;
`;

const Address = ({ data, toggleModal, modalIsOpen }) => {
  if (data) {
    return (
      <CompContainer>
        <Container>
          <span>
            <Icon src="https://zagatinfo.s3-us-west-1.amazonaws.com/location-icon.jpg" />
          </span>
          <AddressText onClick={() => { toggleModal(!modalIsOpen); }} data-address-text>
            {data.location.address}
          </AddressText>
        </Container>
      </CompContainer>
    );
  }

  return '';
};


export default Address;
