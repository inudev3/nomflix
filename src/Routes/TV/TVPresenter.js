import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const TVPresenter = ({ TopRated, Popular, AiringToday, error, loading }) => (
  <>
    <Helmet>
      <title> TV shows | Nomflix </title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {Popular && Popular.length > 0 && (
          <Section title="Popular">
            {Popular.map((show) => (
              <Poster
                imageURL={
                  show.poster_path || require("../../assets/noPosterSmall.png")
                }
                id={show.id}
                title={show.name}
                year={show.first_air_date?.substr(0, 4)}
                rating={show.vote_average}
              />
            ))}
          </Section>
        )}
        {TopRated && TopRated.length > 0 && (
          <Section title="Top Rated">
            {TopRated.map((show) => (
              <Poster
                imageURL={
                  show.poster_path || require("../../assets/noPosterSmall.png")
                }
                id={show.id}
                title={show.name}
                year={show.first_air_date?.substr(0, 4)}
                rating={show.vote_average}
              />
            ))}
          </Section>
        )}
        {AiringToday && AiringToday.length > 0 && (
          <Section title="Airing Today">
            {AiringToday.map((show) => (
              <Poster
                imageURL={
                  show.poster_path || require("../../assets/noPosterSmall.png")
                }
                id={show.id}
                title={show.name}
                year={show.first_air_date?.substr(0, 4)}
                rating={show.vote_average}
              />
            ))}
          </Section>
        )}
        {error && <Message color="#FF0000" text={error} />}
      </Container>
    )}
  </>
);
TVPresenter.propTypes = {
  TopRated: PropTypes.array,
  Popular: PropTypes.array,
  AiringToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
export default TVPresenter;
