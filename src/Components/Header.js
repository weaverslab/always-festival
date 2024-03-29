import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useSound from "use-sound";
import { useCookies } from "react-cookie";

import Slider from "./Slider";
import RatePopup from "./RatePopup";
import crowdSound from "../Sounds/5min_fadeinout.wav";
import ColorContext from "./ColorContext";
import { FullBeer } from "./Icons";
import LineupContext from "./LineupContext";

const Header = styled.header`
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: ${(props) =>
    props.isHome ? "flex-start" : "space-between"};
  align-items: center;
  padding-left: 1rem;
  position: fixed;
  top: 0;
  background-color: #fff;
`;

const Menu = styled.div`
  font-size: 2rem;
  flex: ${(props) => (props.isHome ? 0.15 : 0.3)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.3em;
  div.burger {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateZ(90deg);
    min-width: 32px;
    width: max-content;
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    &:hover {
      cursor: pointer;
    }
  }

  div.whereAmI {
    width: max-content;
    margin-left: 0.7em;
    font-family: Varietee;
    padding-top: 0.2em;
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    span:nth-child(1) {
      &::after {
        content: " ";
      }
    }
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  flex: 0.7;
  div.main {
    width: max-content;
    margin: 0 auto;
    font-family: Varietee;
    padding-top: 0.2em;
    span:nth-child(1) {
      color: ${(props) => props.theme.color.mainBlue};
      &::after {
        content: " ";
      }
    }
    span:nth-child(2) {
      color: ${(props) => props.theme.color.mainRed};
    }
  }
`;

const ExtraMenu = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  flex: 0.4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Dropdown = styled.div`
  font-size: 1.6rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    width: 16rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Varietee";
    background-color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    color: white;
    text-transform: uppercase;
    padding: 0 2em;
    &:hover {
      cursor: pointer;
    }
  }
`;

const DropdownWrapper = styled.div`
  position: fixed;
  top: 3.5rem;
  right: 0;
  z-index: 10;
  width: 16rem;
  height: max-content;
  max-height: 50vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  background-color: white;
  color: ${(props) =>
    props.color === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  text-transform: uppercase;
  border: white 5px solid;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownItem = styled.div`
  width: 100%;
  height: 3.2em;
  font-size: 1.4rem;
  color: ${(props) =>
    props.color === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Varietee";
  text-align: center;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const RateButton = styled.div`
  width: 3.5rem;
  height: 100%;
  background-color: ${(props) =>
    props.color === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1px;
  svg {
    fill: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default withRouter(({ history, match }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [crowdVolume, setCrowdVolume] = useState(0.5);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [muteValue, setMuteValue] = useState(1);
  const [play, { stop }] = useSound(crowdSound, {
    volume: crowdVolume,
    interrupt: true,
    loop: true,
  });

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [cookies, setCookie] = useCookies();
  const [showRateButton, setShowRateButton] = useState(false);
  const [showRatePopup, setShowRatePopup] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whereAmI, setWhereAmI] = useState("");
  const [stage, setStage] = useState("");
  const { color, setColor } = useContext(ColorContext);
  const { lineup } = useContext(LineupContext);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  useEffect(() => {
    if (whereAmI === "stage") {
      setShowRateButton(true);
    }
  }, [whereAmI]);

  useEffect(() => {
    setCrowdVolume(muteValue * volumeValue);
  }, [muteValue, volumeValue]);

  useEffect(() => {
    if (whereAmI === "info" || whereAmI === "contact") {
      setMuteValue(0);
    } else {
      setMuteValue(1);
    }
  }, [whereAmI]);

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [isPlaying, play, stop]);

  useEffect(() => {
    const locationInfo = history.location.pathname.split("/");
    if (match.isExact) {
      setWhereAmI("entrance");
    } else if (!match.isExact) {
      setWhereAmI(locationInfo[1]);
      if (locationInfo[1] === "stage") {
        setStage(locationInfo[2]);
        setColor(locationInfo[2]);
      }
    }
  }, [history.location.pathname, match.isExact, setColor, whereAmI]);

  useEffect(() => {
    let newData;
    if (stage === "red") {
      newData = lineup["red"];
    } else {
      newData = lineup["blue"];
    }
    setData(newData);
    setLoading(false);
  }, [stage, lineup]);

  const toggleCrowd = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const moveTo = (to) => {
    history.push(to);
    setIsSliderOpen(false);
  };

  const handleLineupClick = (id) => {
    setIsDropdownOpen(false);
    history.push(`/stage/${stage}?index=${id}`);
  };

  return (
    <>
      {match.isExact ? (
        <Header isHome={match.isExact}>
          <Menu
            color={color}
            isHome={match.isExact}
            onClick={() => {
              setIsSliderOpen(true);
            }}
          >
            <div className="burger">|||</div>
          </Menu>
          <Logo stage={stage}>
            <div className="main">
              <span>Always</span>
              <span>Festival</span>
            </div>
          </Logo>
        </Header>
      ) : (
        <Header isHome={match.isExact}>
          <Menu color={color} isHome={match.isExact}>
            <div
              onClick={() => {
                setIsSliderOpen(true);
                setIsDropdownOpen(false);
              }}
              className="burger"
            >
              |||
            </div>
            <div className="whereAmI">
              <span>{whereAmI === "stage" ? stage : whereAmI}</span>
              {whereAmI === "stage" && <span>stage</span>}
            </div>
          </Menu>
          {whereAmI === "stage" && (
            <ExtraMenu>
              {!loading && !isPortrait && (
                <Dropdown color={color}>
                  <div
                    onClick={() => {
                      setIsDropdownOpen((v) => !v);
                    }}
                  >
                    lineup
                  </div>
                </Dropdown>
              )}
              {showRateButton && !cookies[`submitScore${stage}`] && (
                <RateButton
                  color={color}
                  onClick={() => {
                    setShowRatePopup(true);
                  }}
                >
                  <FullBeer />
                </RateButton>
              )}
            </ExtraMenu>
          )}
        </Header>
      )}
      {whereAmI === "stage" && !loading && !isPortrait && isDropdownOpen && (
        <DropdownWrapper color={color}>
          {data.map((artist, idx) => (
            <DropdownItem
              key={idx}
              color={color}
              onClick={() => {
                handleLineupClick(idx);
              }}
            >
              {artist.artist}
            </DropdownItem>
          ))}
        </DropdownWrapper>
      )}
      {isSliderOpen && (
        <Slider
          moveTo={moveTo}
          color={color}
          isSliderOpen={isSliderOpen}
          setIsSliderOpen={setIsSliderOpen}
          isPlaying={isPlaying}
          toggleCrowd={toggleCrowd}
          volumeValue={volumeValue}
          setVolumeValue={setVolumeValue}
        />
      )}
      {showRatePopup && (
        <RatePopup
          color={color}
          setShowRatePopup={setShowRatePopup}
          stage={stage}
          setCookie={setCookie}
        />
      )}
    </>
  );
});
