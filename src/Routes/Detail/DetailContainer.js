import React from 'react'
import {moviesAPI, tvAPI} from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        const {location, history, match} = props;
        console.log(location);
        this.state = {
            result:null,
            searchTerm: "",
            error: null,
            loading: true,
            isMovie: location.pathname.includes('/movie'),
        }

    }

    async componentDidMount() {

        const {location, history, match: {params: {id}}} = this.props;
        const {isMovie, loading, error} = this.state;
        if (isNaN(Number(id))) {
            history.push('/');
        }
        let result;
        try {
            if (isMovie) {
                ({data: result} = await tvAPI.showDetail(Number(id)));
            } else {
                ({data: result} = await moviesAPI.movieDetail(Number(id)));
            }

        } catch {
            this.setState({error: "Cant find"})
        } finally {
            this.setState({loading: false, result});
        }

    }

    render() {

        const {
            result,
            isMovie,
            error, loading
        } = this.state;
        return (<DetailPresenter result={result} isMovie={isMovie} error={error} loading={loading}></DetailPresenter>)
    }

}

