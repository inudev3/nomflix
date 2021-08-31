import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import noPoster from "../../assets/noPosterSmall.png";

const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 15px;
`;
const Container = styled.div`
  width: 100px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  height: 180px;
  width: 100%;
  background-position: center center;
  border-radius: 15px;
  transition: 0.5s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 3px;
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.5;
      border: 0.3mm solid skyblue;
    }
  }
}
`;
const Title = styled.span`
  display: block;
  margin-top: 10px;
  margin-bottom: 3px;
  font-size: 12px; ;
`;

const Year = styled.span`
  text-align: start;
  font-size: 12px;
  opacity: 0.5;
`;
const Pagination = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  right: 30px;
  bottom: 40%;

  button {
    background-color: inherit;
    border: none;

    &:hover {
      border: solid;
    }
  }

  i.fa-chevron-right {
    color: white;
    opacity: 0.5;
    position: absolute;
    bottom: 40%;
    right: -10px;
    z-index: 9;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }

  i.fa-chevron-left {
    color: white;
    opacity: 0.5;
    position: absolute;
    bottom: 40%;
    left: -10px;
    z-index: 9;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }
`;
const Seasons = ({ result }) => {
  const { seasons } = result;
  const [page, setPage] = useState(1);
  return (
    <Grid>
      {seasons.length > 0 &&
        seasons.map((season, idx) => {
          const { id, name, poster_path, air_date } = season;
          return (
            idx >= (page - 1) * 10 &&
            idx < page * 10 && (
              <Container>
                <ImageContainer>
                  <Image
                    bgImg={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                        : require("../../assets/noPosterSmall.png").default
                    }
                  />
                </ImageContainer>
                <Title>
                  {name.length > 15 ? `${name?.substring(0, 15)}...` : name}
                </Title>
                <Year>{air_date?.substr(0, 4)}</Year>
              </Container>
            )
          );
        })}
      <Pagination>
        {seasons.length > 10 && page < seasons.length / 10 && (
          <button onClick={() => setPage((prev) => prev + 1)}>
            <i className="fas fa-chevron-right fa-5x"></i>
          </button>
        )}
        {seasons.length > 10 && page > seasons.length / 10 && (
          <button onClick={() => setPage((prev) => prev - 1)}>
            <i className="fas fa-chevron-left fa-5x"></i>
          </button>
        )}
      </Pagination>
    </Grid>
  );
};
export default Seasons;
