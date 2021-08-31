import React from "react";
import { moviesAPI, tvAPI } from "../../api";
import DetailPresenter from "./DetailPresenter";
import { Route, Switch } from "react-router-dom";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie"),
    };
  }

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    const { isMovie, loading, error } = this.state;
    const parsedID = parseInt(id);

    if (isNaN(parsedID)) {
      push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesAPI.movieDetail(parsedID));
      } else {
        ({ data: result } = await tvAPI.showDetail(parsedID));
      }
    } catch {
      this.setState({ error: "Cant find" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  onClickMenu(id) {
    this.setState({ activeTab: id });
  }

  render() {
    const { match, history, location } = this.props;
    return (
      <>
        <DetailPresenter
          {...this.props}
          onClickMenu={this.onClickMenu.bind(this)}
          {...this.state}
        />
      </>
    );
  }
}
