import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { registerUser, loginUser } from "../services/services.js";
import { Context } from "../store/appContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const Login = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [emailListener, setEmailListener] = useState("")
	const [passwordListener, setPasswordListener] = useState("")
	const [redirect, setRedirect] = useState(false)

	const getToken = async (content) => {
		try {
			const res = await loginUser(content);
			const dataJSON = await res.json();
			if (res.status == 200) {
				sessionStorage.setItem("token", dataJSON)
				setRedirect(true)
			} else {
				alert(dataJSON)
			}
		} catch (err) {
			console.log(err);
		}
	};

	const inputVerification = () => {
		if (emailListener.length < 200 && passwordListener.length < 200) {
			const emailArray = emailListener.split("")
			for (let x in emailArray) {
				if (emailArray[x] == "@") {
					emailArray.push(true)
				}
			}
			if (emailArray[emailArray.length - 1] == true) {
				let content = {
					email: emailListener,
					password: passwordListener
				}
				console.log(JSON.stringify(content))
				getToken(content)
			} else {
				alert("Verifica el email")
			}
		} else {
			alert("Verifica los datos insertados")
		}
	}

	useEffect(() => {
		sessionStorage.setItem("token", "")
	}, [])

	return (
		<div className="card">
			<div className="card-body">
				<p className="fs-3 fw-bold">Login page</p>
				<form>
					<label><p className="fs-3">Email</p></label>
					<input onChange={(e) => setEmailListener(e.target.value)} className="form-control form-control-lg" type="text" placeholder="Insert your email" aria-label=".form-control-lg example"></input>
					<label><p className="fs-3">Password</p></label>
					<input onChange={(e) => setPasswordListener(e.target.value)} className="form-control form-control-lg" type="text" placeholder="Insert your password" aria-label=".form-control-lg example"></input>
					<button onClick={inputVerification} type="button" className="btn btn-primary m-3">Login</button>
				</form>
			</div>
			{redirect ? <Redirect to="/user"/> : null}
		</div>
	);
};

Login.propTypes = {
};
