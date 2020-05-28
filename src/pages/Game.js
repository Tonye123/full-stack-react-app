import React from 'react'
import { StyledGame, StyledScore, StyledTimer, StyledCharacter } from '../styled/game'
import { StyledStrong } from '../styled/random'

export default function Game() {
    return (
        <StyledGame>
           <StyledScore>Score: <StyledStrong>0</StyledStrong> </StyledScore>
           <StyledCharacter>A</StyledCharacter>
           <StyledTimer>Time: <StyledStrong>00:00</StyledStrong>  </StyledTimer>
        </StyledGame>
    )
}
