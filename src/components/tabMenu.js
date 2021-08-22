import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const IMG = styled.div`
  height: 100px;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
`;

const IFRAME = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Video = ({ results, id }) => (
  <IFRAME frameBorder="0" src={`https://youtube.com/embed/${id}`} />
);
const Company = ({ logo }) => (
  <IMG>
    <img src={`https://image.tmdb.org/t/p/w300/${logo}`} />
  </IMG>
);

Video.propTypes = {
  id: PropTypes.string.isRequired,
};
Company.propTypes = {
  logo: PropTypes.string.isRequired,
};

export { Video, Company };
