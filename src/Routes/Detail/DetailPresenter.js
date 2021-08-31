import React, { Component, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { Link, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Message from "../../components/Message";
import Videos from "./Videos";
import Productions from "./Productions";
import Seasons from "./Seasons";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("https://image.tmdb.org/t/p/original/${(props) =>
    props.bgImg}");
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url("https://image.tmdb.org/t/p/w500/${(props) =>
    props.bgImg}");
  background-position: center center;
  background-size: cover;
  border-radius: 20px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;
const Data = styled.div`
  width: 70%;
  position: relative;
  margin-left: 15px;
`;

const Title = styled.span`
  font-size: 32px;
`;

const Divider = styled.span`
  margin: 0 10px;
  font-size: 15px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;
const Item = styled.span`
  font-size: 15px;
  align-items: center;

  img {
    height: 30px;
    width: 36px;
  }
`;

const Summary = styled.p`
  font-size: 12px;
  width: 50%;
  line-height: 1.5;
  opacity: 0.7;
`;

const TabContent = styled.div`
  display: grid;

  grid-template-rows: repeat(auto-fill);
  grid-gap: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;

  background-color: ${(props) => (props.activeTab === 0 ? "black" : "inherit")};
  transition: background-color 1s ease-in-out;
`;

const Menu = styled.div`
  position: absolute;

  margin-left: 30px;
  bottom: 80px;
  width: 50%;
  height: 50%;
`;
const Tabs = styled.div`
  height: 40px;
  display: flex;
  margin: 0;
  border: none;
`;

const Tab = styled.button`
  background: linear-gradient(orange, pink);
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  border-radius: 10px 10px 0 0;
  font-weight: 600;

  font-size: 15px;
  border: none;
  padding: 10px;
  height: 40px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  &:hover {
    border: 1px solid green;
  }
`;

const DetailPresenter = ({
  result,
  isMovie,
  error,
  loading,
  match,
  location,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <title> Loading... | Nomflix </title>
          </Helmet>
          <Loader />
        </>
      ) : error ? (
        <Message text={error} />
      ) : (
        <Container>
          <Helmet>
            <title> {isMovie ? result?.title : result?.name} | Nomflix </title>
          </Helmet>
          <Backdrop bgImg={result?.backdrop_path}></Backdrop>
          <Content>
            <Cover
              bgImg={
                result.poster_path
                  ? result.poster_path
                  : require("../../assets/noPosterSmall.png")
              }
            />
            <Data>
              <Title>{isMovie ? result.title : result.name}</Title>
              <ItemContainer>
                <Item>
                  {isMovie
                    ? result.release_date?.substr(0, 4)
                    : result.first_air_date?.substr(0, 4)}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {result?.genres.map((genre) => genre.name).join("  /  ")}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {isMovie
                    ? `${result?.runtime}min`
                    : result?.episode_run_time
                        .map((runtime) => `${runtime}min`)
                        .join(" / ")}
                </Item>
                {isMovie && (
                  <>
                    <Divider>•</Divider>
                    <Item>
                      <a href={`https://imdb.com/title/${result.imdb_id}`}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" />
                      </a>
                    </Item>
                  </>
                )}
              </ItemContainer>
              <Summary>{result?.overview}</Summary>

              <Menu>
                <Tabs>
                  <Tab onClick={() => setActiveTab(0)}>Videos</Tab>
                  <Tab onClick={() => setActiveTab(1)}>Productions</Tab>
                  {!isMovie && (
                    <Tab onClick={() => setActiveTab(2)}>Seasons</Tab>
                  )}
                </Tabs>
                <TabContent activeTab={activeTab}>
                  {activeTab === 0 && <Videos result={result} />}
                  {activeTab === 1 && <Productions result={result} />}
                  {activeTab === 2 && <Seasons result={result} />}
                </TabContent>
              </Menu>
            </Data>
          </Content>
        </Container>
      )}
    </>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  isMovie: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onClickMenu: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};
export default DetailPresenter;
