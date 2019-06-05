import React from 'react';
import styled from 'styled-components';
import TimeListContainer from '../redux/containers/TimeListContainer';
import AddressContainer from '../redux/containers/AddressContainer';
import PhoneNumberContainer from '../redux/containers/PhoneNumberContainer';
import WebsiteContainer from '../redux/containers/WebsiteContainer';
import GetDirectionsContainer from '../redux/containers/GetDirectionsContainer';
import MapContainer from '../redux/containers/MapContainer';
import ModalContainer from '../redux/containers/ModalContainer';

const Module = styled.div`
  @font-face {
    font-family: "Calibre-Regular";
    src: url("https://zagatinfo.s3-us-west-1.amazonaws.com/CalibreWeb-Regular.woff2") format("woff2");
  }
  
  @font-face {
    font-family: "Calibre-Semibold";
    src: url("https://zagatinfo.s3-us-west-1.amazonaws.com/CalibreWeb-Semibold.woff2");
  }
  
  padding: 32px;
  margin: 32px;
  min-width: 22vw;
  max-width: 330px;
  max-height: 80vh;
  background-color: white;
  float: right;
  overflow: scroll;
  font-size: 14px;
  cursor: default;

  font-family: "Calibre-Regular", sans-serif;
`;

const initData = (cb) => {
  const id = window.location.pathname.split('/restaurants/')[1];

  fetch(`/api/restaurants/${id}/info`)
    .then(res => res.json())
    .then(data => cb(data));
};

const App = ({ modalIsOpen, updateData }) => {
  initData((data) => {
    updateData(data);
  });

  return (
    <div>
      {modalIsOpen ? <ModalContainer /> : ''}
      <Module>
        <TimeListContainer />
        <AddressContainer />
        <PhoneNumberContainer />
        <WebsiteContainer />
        <GetDirectionsContainer />
        <MapContainer />
      </Module>
    </div>
  );
};

export default App;
