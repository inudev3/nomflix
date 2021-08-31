import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const IMG = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 95px);
  grid-template-rows: repeat(auto-fill, 95px);
  grid-gap: 10px;

  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    &:first-child {
      position: absolute;
    }

    &:not(:first-child) {
      margin-top: 10px;
    }

    width: 100%;
    height: 100%;
  }
`;

const Productions = ({ result }) => {
  const { production_companies, production_countries } = result;
  console.log(production_countries);
  return (
    <>
      <IMG>
        <span>Production Companies</span>
        {production_companies.length > 0 &&
          production_companies.map(
            (company) =>
              company.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
                />
              )
          )}
      </IMG>
      <IMG>
        <span>Production Countries</span>

        {production_countries.length > 0 &&
          production_countries.map((country) => (
            <span
              className={`flag-icon flag-icon-${country.iso_3166_1.toLowerCase()}`}
            ></span>
          ))}
      </IMG>
    </>
  );
};

export default Productions;
