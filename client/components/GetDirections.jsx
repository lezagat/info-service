import React from 'react';
import styled from 'styled-components';
import CompContainer from './CompContainer';

const Container = styled.div`
  letter-spacing: .013em;
  display: flex;
  justify-content: flex-start;
  color: #101820;
`;

const Icon = styled.img`
  padding-right: 24px;
  padding-left: 2px;
  width: 23px;
`;

const DirA = styled.a`
  text-decoration: none;
  color: #101820;

  &:hover {
    color: #b70038;
  }
`;

const GetDirectionsContainer = styled.span`
  margin-top: 1px;
`;

const Website = ({ data }) => {
  if (data) {
    return (
      <CompContainer>
        <Container>
          <span>
            <Icon src="https://zagatinfo.s3-us-west-1.amazonaws.com/directions-icon.jpg" />
          </span>
          <GetDirectionsContainer>
            <DirA onClick={() => window.location.assign(`https://www.google.com/maps/place/${data.location.coords}`)} data-link>Get Directions</DirA>
          </GetDirectionsContainer>
        </Container>
      </CompContainer>
    );
  }

  return '';
};

export default Website;
