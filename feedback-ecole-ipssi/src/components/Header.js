// modules
import React from "react";
import { Link } from "react-router-dom";

const Header = props => (
    <header>
        <Link to={`/dashboard/${props.user.role}`} className="logo">
            <img alt="logo IPSSI" src="/images/logo.png" />
            <span className="sr-only">Dashboard</span>
        </Link>
        <blockquote>
            L'école d'ingénierie informatique & design graphique
        </blockquote>
        <div className="header-right">
            <Link to={`/dashboard/${props.user.role}`} className="user-name">
                {props.user.first_name} {props.user.last_name}
            </Link>
            <Link to={`/logout`}>Déconnexion</Link>
        </div>
    </header>
);

export default Header;
