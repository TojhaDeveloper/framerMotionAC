import React from "react";
import styled from "styled-components";

const TvShowContainer = styled.div`
  width: 100%;
  height: 6em;
  display: flex;
  align-items:center;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
`;
const ThumbNail = styled.div`
  width: auto;
  height: 100%;
  img {
    aspect-ratio: 1/1;
    height: 100%;
  }
`;
const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex:2;
`;

const Rating = styled.span`
  font-size: 16px;
  color: #a1a1a1;
  display:flex;
  flex:0.5;
`;

export const TVShow = (props) => {
  const { thumbNail, name, rating } = props;
  console.log("rating ",rating);
  return (
    <TvShowContainer>
      <ThumbNail>
        {thumbNail && <img src={thumbNail} />}
      </ThumbNail>
      <Name>{name}</Name>
      {<Rating>{rating ?? "N/A"}</Rating>}
    </TvShowContainer>
  );
};
