import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		sessionStorage.setItem("token", "")
	}, [])

	return (
		<div className="card">
			<div className="card-body">
				<p className="fs-3 fw-bold">Welcome, what would you like to do?</p>
				<Link to={"/login"}>
					<button type="button" className="btn btn-primary me-3">Login</button>
				</Link>
				<Link to={"/register"}>
					<button type="button" className="btn btn-primary me-3">Register</button>
				</Link>
			</div>
		</div>
	);
};
