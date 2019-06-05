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
  padding-left: 3px;
  width: 20px;
`;

const PhoneA = styled.a`
  text-decoration: none;
  color: #101820;

  &:hover {
    color: #b70038;
  }
`;

const PhoneContainer = styled.span`
  margin-top: 1px;
`;

const parseNumber = (number) => {
  const pre = number.slice(1, 4);
  const mid = number.slice(6, 9);
  const suf = number.slice(10);

  return (pre + mid + suf);
};

const PhoneNumber = ({ data }) => {
  if (data) {
    const hrefNumber = parseNumber(data.phone);

    return (
      <CompContainer>
        <Container>
          <span>
            <Icon src="https://zagatinfo.s3-us-west-1.amazonaws.com/phone-icon.jpg" />
          </span>
          <PhoneContainer>
            <PhoneA href={`tel:${hrefNumber}`} data-phone-number>{data.phone}</PhoneA>
          </PhoneContainer>
        </Container>
      </CompContainer>
    );
  }

  return '';
};

export default PhoneNumber;
