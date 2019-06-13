import React from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import MapHelpers from '../map-helpers';
import API_KEY from '../maps-config';

const MapDiv = styled.div`
  height: 328px;
  width: 100%;
  position: relative;
`;

const MarkerContainer = styled.img`
  width: 24px;
`;

const ExpandBtn = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: #b70038;
  width: 150px;
  height: 35px;
  padding: 0 10px;
  box-sizing: border-box;

  &:hover {
    background-color: #b70038;
    color: white;

    svg {
      fill: white;
    }
  }
`;

const ButtonText = styled.p`
  margin: 0;
  letter-spacing: .086em;
`;

const ButtonIcon = styled.div`
  width: 22px;
  fill: #b70038;
`;

const Marker = ({ text }) => (
  <div>
    <MarkerContainer src="https://zagatinfo.s3-us-west-1.amazonaws.com/pin_zagat.png" alt={text} />
  </div>
);

const Map = ({ data, modalIsOpen, toggleModal }) => {
  if (data) {
    const coords = MapHelpers.parseCoords(data.location.coords);
    console.log(coords);
    return (
      <MapDiv>
        <GoogleMapReact
          options={MapHelpers.createMapOptions}
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={{
            lat: Number(coords[0]),
            lng: -Number(coords[1]),
          }}
          defaultZoom={16}
        >
          <Marker
            lat={Number(coords[0])}
            lng={-Number(coords[1])}
            text="Marker"
          />
        </GoogleMapReact>
        <ExpandBtn onClick={() => toggleModal(!modalIsOpen)} className="expand-btn">
          <ButtonText>EXPAND MAP</ButtonText>
          <ButtonIcon className="expand-icon">
            <ng-include src="https://zagat.com/assets/img/ic_expand.svg" class="zgt-expand-map-icon">
              <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <rect id="Rectangle-3" fillOpacity="0" fill="#FFFFFF" x="1.24344979e-14" y="7.10542736e-15" width="24" height="24" />
                <polyline id="arrow-list" transform="translate(7.506097, 15.991378) rotate(-315.000000) translate(-7.506097, -15.991378) " points="6.9607807 18.4408494 2.76277313 14.2364261 2.00609665 14.9941547 7.49539852 20.491378 13.0060967 14.9724391 12.249131 14.2152897 8.03030547 18.4408494 8.03030547 11.491378 6.9607807 11.491378 6.9607807 18.4408494" />
                <polygon id="arrow-list-copy" transform="translate(15.991378, 7.506097) rotate(-315.000000) translate(-15.991378, -7.506097) " points="20.7347015 9.26104855 21.491378 8.50332003 16.0020762 3.00609665 10.491378 8.5250356 11.2483436 9.28218503 15.4671692 5.05662525 15.4671692 12.0060967 16.536694 12.0060967 16.536694 5.05662525" />
              </svg>
            </ng-include>
          </ButtonIcon>
        </ExpandBtn>
      </MapDiv>
    );
  }
  return '';
};

export default Map;
