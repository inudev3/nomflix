import React from "react";
import HomePresenter from "./HomePresenter";
import { CoinsAPI, moviesAPI, PricesAPI } from "../../api";

export default class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      nowPlaying: null,
      upComing: null,
      TopRated: null,
      Popular: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const {
        data: { results: Popular },
      } = await moviesAPI.Popular();
      const {
        data: { results: nowPlaying },
      } = await moviesAPI.nowPlaying();
      const {
        data: { results: upComing },
      } = await moviesAPI.upComing();

      this.setState({ nowPlaying, Popular, upComing });
    } catch {
      this.setState({ error: "Cant find movies information" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { nowPlaying, upComing, Popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upComing={upComing}
        Popular={Popular}
        error={error}
        loading={loading}
      ></HomePresenter>
    );
  }
}
