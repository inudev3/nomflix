import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";
import Message from "../../components/Message";
import { Video, Company } from "../../components/tabMenu";

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
`;
const Item = styled.span`
  font-size: 15px;
`;

const Summary = styled.p`
  font-size: 12px;
  width: 50%;
  line-height: 1.5;
  opacity: 0.7;
`;

const TabContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 100px);
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
  margin-bottom: 10px;
  border: none;
  margin: 0;
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
  activeTab,
  onClickMenu,
}) => {
  console.log(result);
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
                    ? result.release_date.substr(0, 4)
                    : result.first_air_date.substr(0, 4)}
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
                <Divider>•</Divider>
                <Item></Item>
              </ItemContainer>
              <Summary>{result?.overview}</Summary>

              <Menu>
                <Tabs>
                  <Tab
                    isActive={activeTab === 0}
                    onClick={() => onClickMenu(0)}
                  >
                    Videos
                  </Tab>
                  <Tab
                    isActive={activeTab === 1}
                    onClick={() => onClickMenu(1)}
                  >
                    Production Companies
                  </Tab>
                </Tabs>
                <TabContent activeTab={activeTab}>
                  {activeTab === 0
                    ? result.videos.results &&
                      result.videos.results.length > 0 && (
                        <Video id={result.videos.results[0].key} />
                      )
                    : result.production_companies &&
                      result.production_companies.length > 0 &&
                      result.production_companies.map(
                        (company, index) =>
                          company.logo_path && (
                            <Company key={index} logo={company.logo_path} />
                          )
                      )}
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
