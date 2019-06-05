import React from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import MapHelpers from '../map-helpers';
import API_KEY from '../maps-config';

const Container = styled.div`
  z-index: 9999;
`;

const MapDiv = styled.div`
  height: calc(100vh - 100px);
  width: calc(100vw - 200px);
  margin-bottom: 30px;
  font-family: "Calibre-Regular", sans-serif;
`;

const MarkerContainer = styled.img`
  width: 24px;
`;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(16,24,32,.95);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GetDirectionsButton = styled.div`
  position: fixed;
  bottom: 60px;
  left: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #b70038;
  background-color: white;
  color: #b70038;
  width: 310px;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;

  &:hover {
    background-color: #b70038;
    color: white;

    svg {
      stroke: white;
    }
  }
`;

const ButtonText = styled.p`
  margin: 0;
  letter-spacing: .086em;
`;

const ButtonIcon = styled.svg`
  width: 22px;
  stroke: #b70038;
`;

const Title = styled.p`
  color: white;
  font-size: 18px;
  font-family: "Calibre-Regular", sans-serif;
`;

const CloseButton = styled.div`
  position: fixed;
  top: 20px;
  right: 80px;
  width: 35px;

  &:hover #background {
    fill: white;
  }

  &:hover #path {
    fill: rgb(16, 24, 32);
  }
`;

const enableScroll = () => {
  document.body.style['overflow-y'] = 'auto';
};

const disableScroll = () => {
  document.body.style['overflow-y'] = 'hidden';
};

const Marker = ({ text }) => (
  <div>
    <MarkerContainer src="https://zagatinfo.s3-us-west-1.amazonaws.com/pin_zagat.png" alt={text} />
  </div>
);

const MapModal = ({ data, modalIsOpen, toggleModal }) => {
  disableScroll();

  if (data) {
    const coords = MapHelpers.parseCoords(data.location.coords);
    return (
      <Container>
        <ModalBG data-modal>
          <Title>{data.name}</Title>
          <MapDiv>
            <GoogleMapReact
              options={MapHelpers.createMapOptions}
              bootstrapURLKeys={{ key: API_KEY }}
              defaultCenter={{
                lat: Number(coords[0]),
                lng: -Number(coords[1]),
              }}
              defaultZoom={16}
              data-modal-map
            >
              <Marker
                lat={Number(coords[0])}
                lng={-Number(coords[1])}
                text="Marker"
              />
            </GoogleMapReact>
            <GetDirectionsButton className="get-dirs-btn" onClick={() => location.assign(`https://www.google.com/maps/place/${data.location.coords}`)}>
              <ButtonText>GET DIRECTIONS</ButtonText>
              <ButtonIcon viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <g id="ZagX-Icons" strokeWidth="1.5" fill="none" fillRule="evenodd">
                  <g id="directions">
                    <g id="Page-1" transform="translate(2.000000, 2.000000)">
                      <polygon id="Stroke-1" points="12.4349377 7.72051001 13.9766567 9.00464447 12.4349377 10.2887789" />
                      <polyline id="Stroke-2" points="7.17898298 12.3341135 7.17898298 9.00445507 11.6459905 9.00445507" />
                      <path d="M13.9325264,15.9027951 L10.5100619,19.3252596 C10.1416782,19.6936434 9.538438,19.6936434 9.1710013,19.3252596 L0.355361407,10.5096198 C-0.0130222989,10.1412361 -0.0130222989,9.5389429 0.355361407,9.17055919 L9.1710013,0.354919302 C9.539385,-0.0134644042 10.1416782,-0.0134644042 10.5100619,0.354919302 L19.3257018,9.17055919 C19.6940855,9.5389429 19.6940855,10.1412361 19.3257018,10.5096198 L15.8786151,13.9567064" id="Stroke-3" />
                    </g>
                  </g>
                </g>
              </ButtonIcon>
            </GetDirectionsButton>
            <CloseButton className="close-btn" onClick={() => { toggleModal(!modalIsOpen); enableScroll(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" version="1.1">
                <title>close</title>
                <g id="FINAL" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="ZGX_Place_Desktop_03_imagegrid01" transform="translate(-1218.000000, -21.000000)">
                    <g id="ic_close" transform="translate(1218.392090, 21.417480)">
                      <path d="M19.4857146,0 C8.74166275,0 0,8.74166275 0,19.4857146 C0,30.2297665 8.74166275,38.9714293 19.4857146,38.9714293 C30.2297665,38.9714293 38.9714293,30.2297665 38.9714293,19.4857146 C38.9714293,8.74166275 30.2297665,0 19.4857146,0 L19.4857146,0 Z" id="background" fill="#101820" />
                      <polyline id="path" fill="#FFFFFF" points="27.3653665 9.7660546 19.4847868 17.6475622 11.604207 9.7660546 9.7660546 11.604207 17.6466343 19.4847868 9.7660546 27.3653665 11.604207 29.2035189 19.4847868 21.3229392 27.3653665 29.2035189 29.2035189 27.3653665 21.3220113 19.4847868 29.2035189 11.604207 27.3653665 9.7660546" />
                    </g>
                  </g>
                </g>
              </svg>
            </CloseButton>
          </MapDiv>
        </ModalBG>
      </Container>
    );
  }
  return '';
};

export default MapModal;
