import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "./Header";
import React from "react";
const Router = () => {
	return (
		<BrowserRouter>
			<>
				<Header />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/tv" exact component={TV} />
					<Route path="/search" component={Search} />
					<Route path="/movie/:id" component={Detail} />
					<Route path="/show/:id" component={Detail} />
					<Redirect from="*" to="/"></Redirect>
				</Switch>
			</>
		</BrowserRouter>
	);
}; //route에는 history, location, match props가 기본으로 주어짐 by default
export default Router; // switch: only one router at a time
