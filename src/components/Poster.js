import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  height: 200px;
`;

const Image = styled.div`
  background-image: url("https://image.tmdb.org/t/p/w300/${(props) =>
    props.bgImg}");
  background-size: cover;
  height: 180px;
  width: 100%;
  background-position: center center;
  border-radius: 15px;
  transition: 0.5s linear;
`;
const Rating = styled.span`
  z-index: 10;
  bottom: 10px;
  right: 10px;
  position: absolute;
  font-size: 12px;
  opacity: 0;
  transition: 0.5s linear;
`;
const ImageContainer = styled.div`
  margin-bottom: 3px;
  position: relative;
  &:hover{
    ${Image}{
    opacity:0.5; 
     border: 0.3mm solid skyblue;
    }
    ${Rating}{
      opacity:1;
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

const Poster = ({ imageURL, id, title, rating, year, isMovie = false }) => {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image bgImg={imageURL} />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 15 ? `${title.substring(0, 15)}...` : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  );
};
Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
};
export default Poster;
