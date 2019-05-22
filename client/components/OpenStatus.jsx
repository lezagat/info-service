import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  letter-spacing: .013em;
  display: flex;
  justify-content: flex-start;
  color: #101820;

  &:hover {
    color: #b70038;
  }
`;

const Status = styled.div`
  font-family: Calibre-Semibold;
  float: right;
  margin-top: 2px;
`;

const Icon = styled.img`
  padding-right: 24px;
  padding-left: 2px;
  width: 22px;
`;

const BulletContainer = styled.span`
  margin-left: 3px;
  font-size: 6px;
  position: relative;
  top: -3px;
`;

const TimeContainer = styled.span`
  margin-top: 2px;
  margin-left: 3px;
`;

const ChevronContainer = styled.span`
  margin-top: 3px;
  margin-left: 7px;
`;

const isOpen = (open, close) => {
  const closeTime = close + 12;
  const date = new Date();
  const curTime = date.getHours();

  if (curTime > closeTime || curTime < open) {
    return false;
  }

  return true;
};

const OpenStatus = ({ data, day, toggleTimeList, timeListIsOpen }) => {
  const { open, close } = data.hours[day];
  const status = isOpen(data.hours[day].open, data.hours[day].close);

  return (
    <Container onClick={() => toggleTimeList(!timeListIsOpen)}>
      <span>
        <Icon src="./icons/time-icon.jpg" />
      </span>
      <Status>
        {
          status
            ? (
              <span>
                Open Now
                <BulletContainer>&bull;</BulletContainer>
              </span>
            )
            : (
              <span>
                Closed
                <BulletContainer>&bull;</BulletContainer>
              </span>
            )
        }
      </Status>
      <TimeContainer>
        {status
          ? `${open}:00 AM - ${close}:00 PM`
          : `Reopens at ${open}:00 AM`
        }
      </TimeContainer>
      <ChevronContainer><i className={`fas fa-chevron-down ${timeListIsOpen ? 'up' : ''}`} /></ChevronContainer>
    </Container>
  );
};


export default OpenStatus;
