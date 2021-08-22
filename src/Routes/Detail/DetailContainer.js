import React from "react";
import { moviesAPI, tvAPI } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      searchTerm: "",
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie"),
      activeTab: 0,
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
    const parsedID = Number(id);

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
    const { result, isMovie, error, loading, activeTab } = this.state;

    return (
      <DetailPresenter
        activeTab={activeTab}
        onClickMenu={this.onClickMenu.bind(this)}
        result={result}
        isMovie={isMovie}
        error={error}
        loading={loading}
      ></DetailPresenter>
    );
  }
}
