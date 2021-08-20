import React, {Component} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';


const DetailPresenter = ({nowPlaying, upComing, Popular, error, loading}) => {

    return null;


}
DetailPresenter.propTypes = {
    result: PropTypes.object,
    isMovie: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}
export default DetailPresenter;