import React, {Component} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Section from "components/Section";
import Loader from "../../components/Loader";

const Container = styled.div`
    padding: 0px 10px;
`;


const HomePresenter = ({nowPlaying, upComing, Popular, error, loading}) =>
    (loading ? <Loader/> : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 &&
            <Section title="Now Playing">{nowPlaying.map(movie => <div>{movie.title}</div>)}</Section>}
            {upComing && upComing.length > 0 &&
            <Section title="Upcoming">{upComing.map(movie =>
                <div>{movie.title}</div>)}</Section>}
            {Popular && Popular.length > 0 &&
            <Section title="Popular">{upComing.map(movie =>
                <div>{movie.title}</div>)}</Section>}
        </Container>
    ))
HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    Popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}
export default HomePresenter;
