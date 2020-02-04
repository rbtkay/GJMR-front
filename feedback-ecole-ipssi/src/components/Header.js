// modules
import React from "react";

export const Header = props => (
    <header>
        <a href={`/${props.user.role}/dashboard`} className="logo">
            <img alt="logo IPSSI" src="/images/logo.png" />
            <span className="sr-only">Dashboard</span>
        </a>
        <blockquote>L'école d'ingénierie informatique & design graphique</blockquote>
        <div className="header-right">
            <a href={`/${props.user.role}/dashboard`} className="user-name">
                {props.user.first_name} {props.user.last_name}
            </a>
            <a href="/logout">Déconnexion</a>
        </div>
    </header>
);
