import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import BounceArrow from "../Images/BounceArrow.png";
import { Textfit } from "react-textfit";
import YouTube from "@u-wave/react-youtube"; // for youtube api
import { useMediaQuery } from "react-responsive";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

const LINEUP = {
  blue: [
    "BTS 34:50",
    "WEEKEND 6:20",
    "BEYONCE 58:40",
    "Pink Floyd 34:50",
    "IMAGINE DRAGONS 57:32",
    "1975 48:59",
    "Carpenters 42:11",
    "Queen 17:32",
    "Prince 29:43",
    "Whitney Houston 84:14",
  ],
  red: [
    "BILLIE EILISH 34:23",
    "David Bowie 6:20",
    "Bob Marley 58:40",
    "Bob Dylan 34:23",
    "Beatles 57:32",
    "Rolling Stones 48:59",
    "The Who 42:11",
    "Amy Winehouse 17:32",
    "jamiroquai 29:43",
    "Coldplay 84:14",
  ],
};

const PLAY_DUMMY = {
  blue: {
    id: "SqdE10H4ZCk",
    artist: "BEYONCE",
    comment:
      "Beyoncé deserves every bit of screaming when she gets on that stage",
  },
  red: {
    id: "lpKE6yBw2Os",
    artist: "BILLIE EILISH",
    comment: "Billie got a sprained ankle but she still rocking that brace",
  },
};

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
`;

const Video = styled.div`
  height: 50%;
  width: 100vw;
  flex: 1;
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  height: 75%;
`;

const Artist = styled.div`
  width: 100%;
  max-height: 50px;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  div {
    font-family: discoDiva;
    font-size: 1.2rem;
    color: white;
  }
`;

const MarqueeFrame = keyframes`
  from{
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  to{
    -webkit-transform: translate(100%, 0);
    transform: translate(-100%, 0);
  }
  `;

const MarqueeAnimation = css`
  animation-name: ${MarqueeFrame};
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  -webkit-animation-name: ${MarqueeFrame};
  -webkit-animation-duration: 20s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-fill-mode: both;
`;

const Comment = styled.div`
  width: 100%;
  max-height: 50px;
  height: 10%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0px 30px;
  div {
    font-family: Mont;
    color: white;
    min-width: 100%;
    width: max-content;
    white-space: nowrap;
    display: flex;
    align-items: center;
    ${MarqueeAnimation};
  }
`;

const Lineup = styled.div`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1rem;
`;

const LineupWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: white;
  color: ${(props) =>
    props.Stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  text-transform: uppercase;
  border: white 5px solid;
`;

const LineupItem = styled.div`
  width: 100%;
  height: 2.5em;
  font-size: 1.6rem;
  color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Varietee";
`;

const Stage = ({ history, match }) => {
  const {
    params: { stage },
  } = match;

  const image = stage === "red" ? StageRed : StageBlue;
  const x = parseInt(Math.random() * 100);
  const y = parseInt(Math.random() * 100);

  const getYoutubeIframe = (video_id) => {
    return {
      __html: `<iframe
      id="ytplayer"
      type="text/html"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${video_id}?autoplay=1&playsinline=1"
      frameborder="0"
     />`,
    };
  };

  return (
    <Wrapper stage={stage} height={window.innerHeight}>
      <Video>
        <YoutubeWrapper>
          <YouTube
            width="100%"
            height="100%"
            video={PLAY_DUMMY[stage].id}
            playsInline={true}
          />
        </YoutubeWrapper>
        <Artist>
          <div>{PLAY_DUMMY[stage].artist}</div>
        </Artist>
        <Comment>
          <div>{PLAY_DUMMY[stage].comment}</div>
        </Comment>
      </Video>
      <Lineup stage={stage} image={image} x={x} y={y}>
        <LineupWrapper stage={stage}>
          {LINEUP[stage].map((artist, idx) => (
            <LineupItem key={idx} stage={stage}>
              {artist}
            </LineupItem>
          ))}
        </LineupWrapper>
      </Lineup>
    </Wrapper>
  );
};

export default Stage;
