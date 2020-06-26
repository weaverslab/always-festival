import React from "react";
import styled, { css } from "styled-components";

const STAGE_NAME = {
  home: "STAGE 0",
  stageA: "STAGE A",
  stageB: "STAGE B",
  stageC: "STAGE C",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color[`${props.from}`].background};
  font-family: Bebas Neue;
`;

const Header = styled.div`
  width: 90vw;
  height: 25%;
  border-bottom: 1px solid black;
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0.4em;
`;

const Title = styled.div`
  width: 100%;
  height: max-content;
  background-color: black;
  color: ${(props) => props.theme.color[`${props.from}`].background};
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 1px;
  padding: 0.1em 0;
`;

const SubTitle = styled.div`
  width: 100%;
  height: max-content;
  text-align: center;
  background-color: black;
  color: ${(props) => props.theme.color[`${props.from}`].background};
  font-size: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 0.1em 0;
`;

const Content = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  color: ${(props) => props.theme.color[`${props.from}`].background};
`;

const OnStageCSS = css`
  background-color: black;
  &::after {
    content: "IS ON STAGE";
    font-size: 0.5em;
  }
`;

const OffStageCSS = css`
  color: black;
`;

const Line = styled.div`
  width: 100vw;
  height: 16%;
  min-height: max-content;
  flex: 1;
  font-size: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => (props.onstage ? OnStageCSS : OffStageCSS)}
`;

const Lineup = ({ from, data }) => {
  return (
    <Wrapper from={from}>
      <Header>
        <Title from={from}>{STAGE_NAME[from]}</Title>
        <SubTitle from={from}>LINEUP</SubTitle>
      </Header>
      <Content from={from}>
        <Line> QUEEN </Line>
        <Line> QUEEN </Line>
        <Line> QUEEN </Line>
        <Line onstage={"onstage"}> QUEEN </Line>
        <Line> QUEEN </Line>
        <Line> QUEEN </Line>
      </Content>
    </Wrapper>
  );
};

export default Lineup;
