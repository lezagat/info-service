import React from 'react';
import styled from 'styled-components';

const EntryContainer = styled.span`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0;
`;

const Dots = styled.span`
  border-top: 1px #101820 dotted;
  position: absolute;
  left: 0;
  top: 17px;
  width: 100%;
`;

const NoDotSpan = styled.span`
  color: #101820;
  background-color: white;
  line-height: 26px;
  z-index: 1;
`;

const NoDotSpanBold = styled.span`
  color: #101820;
  background-color: white;
  line-height: 26px;
  z-index: 1;
  font-family: 'Calibre-Semibold';
`;

const TimeListEntry = ({ open, close, day, isBold }) => {
  if (isBold) {
    return (
      <EntryContainer>
        <NoDotSpanBold>{day}</NoDotSpanBold>
        <NoDotSpanBold data-hours-entry>{`${open}:00 AM - ${close}:00 PM`}</NoDotSpanBold>
        <Dots />
      </EntryContainer>
    );
  }

  return (
    <EntryContainer>
      <NoDotSpan>{day}</NoDotSpan>
      <NoDotSpan data-hours-entry>{`${open}:00 AM - ${close}:00 PM`}</NoDotSpan>
      <Dots />
    </EntryContainer>
  );
};

export default TimeListEntry;
