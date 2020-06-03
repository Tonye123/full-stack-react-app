import React from 'react'
import { Link } from "react-router-dom"
import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink, Accent } from '../styled/navBar'
import { useAuth0 } from "../auth";


export default function NavBar({togTheme}) {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <StyledNavbar>
            <div>
                <StyledNavBrand>
                    <Link to="/">
                        Learn.Build.<Accent>Type.</Accent>
                    </Link>
                </StyledNavBrand>
            </div>
            <StyledNavItems>
                <li><StyledLink to="/">Home</StyledLink></li>
                <li><StyledLink to = "/highScores">High Scores</StyledLink></li>
                {!isAuthenticated && (
                    <li><button onClick={loginWithRedirect}>Login</button></li>

                )}
                  {isAuthenticated && (
                    <li><button onClick={logout}>Logout</button></li>

                )}
                <li><button onClick={togTheme}>
                    Toggle Theme
                </button></li>

            </StyledNavItems>
        </StyledNavbar>
    )
}
