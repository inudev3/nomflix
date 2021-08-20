import React from 'react'
import SearchPresenter from "./SearchPresenter";
import {moviesAPI, tvAPI} from "../../api";

export default class SearchContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            movieResults: null,
            tvResults: null,
            error: null,
            loading: false,
            ismovie: false
        }
    }

    handleSubmit = () => {
        const {searchTerm} = this.state;

        if (searchTerm !== '') {
            this.searchbyTerm();
        }
        this.setState({searchTerm: ""});
    }

    async searchbyTerm() {
        const {searchTerm} = this.state;
        let result;
        try {
            this.setState({loading: true});

            const {data: {results: movieResults}} = await moviesAPI.search(searchTerm);

            const {data: {results: tvResults}} = await tvAPI.search(searchTerm);
            this.setState({movieResults, tvResults})
        } catch {
            this.setState({error: "Cant find movies information"})
        } finally {
            this.setState({loading: false, result});
        }

    }


    render() {
        const {
            isMovie, searchTerm,
            movieResults,
            tvResults, error, loading
        } = this.state;
        console.log(this.state);
        return (<SearchPresenter searchTerm={searchTerm} isMovie={isMovie}
                                 handleSubmit={this.handleSubmit.bind(this)}
                                 movieResults={movieResults}
                                 tvResults={tvResults} error={error} loading={loading}></SearchPresenter>)
    }

}

