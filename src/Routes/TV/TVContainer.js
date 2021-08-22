import React from 'react'
import TVPresenter from "./TVPresenter";
import { tvAPI} from "../../api";

export default class TVContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            TopRated: null,
            Popular: null,
            AiringToday: null,
            error: null,
            loading: true
        }
    }

    async componentDidMount() {

        try {
            const {data: {results: TopRated}} = await tvAPI.TopRated();
            const {data: {results: Popular}} = await tvAPI.Popular();
            const {data: {results: AiringToday}} = await tvAPI.AiringToday();
            this.setState({TopRated, Popular, AiringToday});
        } catch {
            this.setState({error:"Cant find tv information"})
        } finally {
            this.setState({loading: false})
        }

    }

    render() {
        const {
            TopRated, Popular,
            AiringToday, error, loading
        } = this.state;
        return (<TVPresenter TopRated={TopRated}
                            Popular={Popular}
                            AiringToday={AiringToday} error={error} loading={loading}></TVPresenter>)
    }

}

