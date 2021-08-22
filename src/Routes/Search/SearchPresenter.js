import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
  all: unset;
  color: white;
  width: 100%;
  font-size: 25px;
  text-align: center;
  :focus {
    text-decoration: underline;
  }
`;

const SearchPresenter = ({
  movieResults,
  searchTerm,
  onChange,
  tvResults,
  error,
  loading,
  handleSubmit,
}) => {
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Search Movies or TV Shows"
            type="text"
            value={searchTerm}
            onChange={onChange}
          />
        </Form>
      </Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie) => (
                  <Poster
                    imageURL={
                      movie.poster_path ||
                      require("../../assets/noPosterSmall.png")
                    }
                    id={movie.id}
                    title={movie.title}
                    year={movie.release_date.substr(0, 4)}
                    rating={movie.vote_average}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
          </Container>
          <Container>
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Show Results">
                {tvResults.map((show) => (
                  <Poster
                    imageURL={
                      show.poster_path ||
                      require("../../assets/noPosterSmall.png")
                    }
                    id={show.id}
                    title={show.name}
                    year={show.first_air_date?.substr(0, 4)}
                    rating={show.vote_average}
                  />
                ))}
              </Section>
            )}
          </Container>
        </>
      )}
      {error && <Message color="red" text={error} />}
      {movieResults &&
        movieResults.length === 0 &&
        tvResults &&
        tvResults.length === 0 && <Message text="Nothing Found." />}
    </>
  );
};
SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};
export default SearchPresenter;
