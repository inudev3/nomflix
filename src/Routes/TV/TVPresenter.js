import React, {Component} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Loader from "../../components/Loader";
import Section from "../../components/Section";

const Container = styled.div`
    padding:0 10px;
`;


const TVPresenter = ({TopRated, Popular, AiringToday, error, loading}) =>{
    console.log(Popular);
    return (loading ? <Loader/> : (
        <Container>
            {Popular && Popular.length > 0 &&
            <Section title="Popular">{Popular.map(show => show.name)}</Section>}
            {TopRated && TopRated.length > 0 &&
            <Section title="Top Rated">{TopRated.map(show =>
                show.name)}</Section>}
            { AiringToday&& AiringToday.length > 0 &&
            <Section title="Airing Today">{AiringToday.map(show =>
                show.name)}</Section>}
        </Container>
    ))}
TVPresenter.propTypes = {
    TopRated: PropTypes.array,
    Popular:PropTypes.array,
    AiringToday:PropTypes.array,
    error:PropTypes.string,
    loading:PropTypes.bool.isRequired
}
export default TVPresenter;