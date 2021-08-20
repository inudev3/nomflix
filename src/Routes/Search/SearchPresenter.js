import React, {Component} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';


const SearchPresenter = ({ isMovie, movieResults, tvResults, error, loading }) => {

    return null;
}
SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    ismovie: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string,
    handleSubmit:PropTypes.func.isRequired
};
export default SearchPresenter;