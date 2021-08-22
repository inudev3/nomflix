import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Section from "components/Section";
import Loader from "../../components/Loader";
import Poster from "../../components/Poster";
import Message from "../../components/Message";

const Container = styled.div`
  padding: 20px;
`;

const HomePresenter = ({ nowPlaying, upComing, Popular, error, loading }) => (
  <>
    <Helmet>
      <title> Movies | Nomflix </title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="Now Playing">
            {nowPlaying.map((movie) => (
              <Poster
                imageURL={
                  movie.poster_path || require("../../assets/noPosterSmall.png")
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
        {upComing && upComing.length > 0 && (
          <Section title="Upcoming">
            {upComing.map((movie) => (
              <Poster
                imageURL={
                  movie.poster_path || require("../../assets/noPosterSmall.png")
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
        {Popular && Popular.length > 0 && (
          <Section title="Popular">
            {Popular.map((movie) => (
              <Poster
                imageURL={
                  movie.poster_path || require("../../assets/noPosterSmall.png")
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
        {error && <Message color="#FF0000" text={error} />}
      </Container>
    )}
  </>
);

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upComing: PropTypes.array,
  Popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
export default HomePresenter;
