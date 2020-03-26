import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"
import "./styles.css"
import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"
import api from "../../services/api"

export default function Logon() {
    const [id, setID] = useState("")
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post("sessions", { id })

            localStorage.setItem("ongId", id)
            localStorage.setItem("ongName", response.data.name)

            history.push("/profile")


        } catch (err) {
            alert("ONG não encontrada, tente novamente!")
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} ></img>

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Realizar Cadastro
                    </Link>
                </form>
            </section>


            <img src={heroesImg} className="logo"></img>
        </div>
    )
}