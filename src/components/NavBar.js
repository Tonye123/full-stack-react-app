import React from 'react'
import { Link } from "react-router-dom"
import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink, Accent } from '../styled/navBar'

export default function NavBar() {
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
            </StyledNavItems>
        </StyledNavbar>
    )
}
