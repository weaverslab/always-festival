import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

const WaveFrame = (x, y) => keyframes`
  0%{
    background-position-x: ${x}%;
    background-position-y: ${y}%;
    background-size: 250%;
  }
  12.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  25%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  37.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  50%{
    background-position-x: ${x}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  62.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  75%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  87.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
    background-size: ${Math.random() * 6 + 247}%;
  }
  100%{
    background-position-x: ${x}%;
    background-position-y: ${y}%;
    background-size: 250%;
  }
`;

const WaveAnimation = (x, y) => css`
  animation: ${WaveFrame(x, y)} ${Math.random() * 3 + 8}s linear infinite;
`;

const Pattern = styled.div`
  width: 100%;
  height: ${(props) => (props.isPortrait ? props.ratio : 100)}%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1.5rem;
  ${(props) => WaveAnimation(props.x, props.y)};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: DiscoDiva;
  -webkit-text-stroke: 2px;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Entrance = ({ stage, ratio, isPortrait }) => {
  const image = stage === "red" ? StageRed : StageBlue;
  const x = parseInt(Math.random() * 90 + 5);
  const y = parseInt(Math.random() * 90 + 5);
  return (
    <Pattern
      stage={stage}
      ratio={ratio}
      isPortrait={isPortrait}
      image={image}
      x={x}
      y={y}
    >
      <Link to={`/stage/${stage}`}>
        <Wrapper stage={stage}>{stage} stage</Wrapper>
      </Link>
    </Pattern>
  );
};

export default Entrance;