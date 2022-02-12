import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { getUser } from "../services/services.js";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const User = () => {
	const { store, actions } = useContext(Context);
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})

    const getToken = async (token) => {
		try {
			const res = await getUser(token);
			const dataJSON = await res.json();
            setUser(dataJSON)
            setTimeout(() => {
                setToken("")
                sessionStorage.setItem("token", "")
            }, 15000);
		} catch (err) {
			console.log(err);
		}
	};

    useEffect(() => {
        if (token == "") {
            alert("Acceso Prohibido")
        } else {
            getToken(token)
        }
    }, [])

	return (
		<div className="card">

			<div className="card-body">
				<p className="fs-3 fw-bold">Hola {user.email}</p>
                <p className="fs-5">tu token permanecerá válido solo por 15 segundo, luego serás enviado a la página principal :)</p>
			</div>
            <button onClick={() => setToken("")} type="button" className="btn btn-primary m-3">Logout</button>
            {token == "" ? <Redirect to={"/"} /> : null}
		</div>
	);
};
