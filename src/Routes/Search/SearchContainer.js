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
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;

        if (searchTerm !== '') {
            this.searchbyTerm();
        }
        this.setState({searchTerm: ""});
    }

    onChange = (event) => {
        this.setState({searchTerm: event.target.value});
    }

    async searchbyTerm() {
        const {searchTerm} = this.state;
        try {
            this.setState({loading: true});

            const {data: {results: movieResults}} = await moviesAPI.search(searchTerm);

            const {data: {results: tvResults}} = await tvAPI.search(searchTerm);
            this.setState({movieResults, tvResults})
        } catch {
            this.setState({error: "Cant find movies information"})
        } finally {
            this.setState({loading: false});
        }

    }


    render() {
        const {
            searchTerm,
            movieResults,
            tvResults, error, loading
        } = this.state;

        return (<SearchPresenter searchTerm={searchTerm}
                                 handleSubmit={this.handleSubmit.bind(this)}
                                 movieResults={movieResults}
                                 onChange={this.onChange.bind(this)}
                                 tvResults={tvResults} error={error} loading={loading}></SearchPresenter>)
    }

}

