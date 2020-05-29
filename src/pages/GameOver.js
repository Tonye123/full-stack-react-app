import React, { useContext } from 'react'
import { ScoreContext } from '../contexts/ScoreContext'
import { StyledLink } from '../styled/navBar'


export default function ({history}) {
    const[score] = useContext(ScoreContext)
    if(score === -1){
        history.push('/')

    }
    return (
        <div>
            <h1>GameOver: your score:{score}</h1>
            <StyledLink to='/'>Go Home</StyledLink>
            <StyledLink to='/game'>PlayAgain?</StyledLink>
        </div>
    )
}
