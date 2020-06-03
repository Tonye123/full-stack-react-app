import React from 'react'
import { Link } from "react-router-dom"
import { StyledNavbar, 
        StyledNavBrand, 
        StyledNavItems, 
        StyledLink, Accent, 
        StyledButtonLink } 
        from '../styled/navBar'
import { useAuth0 } from "../auth";
import {StyledButton} from '../styled/Buttons'


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
                    <li><StyledButtonLink onClick={loginWithRedirect}>Login</StyledButtonLink></li>

                )}
                  {isAuthenticated && (
                    <li><StyledButtonLink onClick={logout}>Logout</StyledButtonLink></li>

                )}
                <li><StyledButton onClick={togTheme}>
                    Toggle Theme
                </StyledButton></li>

            </StyledNavItems>
        </StyledNavbar>
    )
}
