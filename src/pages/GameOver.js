import React, { useContext, useEffect, useState } from 'react'
import { ScoreContext } from '../contexts/ScoreContext'
import { StyledLink } from '../styled/navBar'
import { StyledCharacter } from '../styled/game';


export default function ({history}) {
    const[score] = useContext(ScoreContext)
    const[scoreMessage,setScoreMessage] = useState('');
    if(score === -1){
        history.push('/')

    }

    useEffect(()=>{
        const saveHighScore = async () => {
            try {
                const options = {
                    method: 'POST',
                    body:JSON.stringify({name:"Jamison", score})
                }
                const res = await fetch('/.netlify/functions/saveHighScore',options)
                const data = await res.json();
                if(data.id){
                    setScoreMessage('Congrats! you got a High Score!!!!!')
                }else {
                    setScoreMessage('OOPs no high score this time, Try again')
                }

               
                
            } catch (error) {
                console.error(error)
                
            }
        }
        saveHighScore();
    }, [])
    return (
        <div>
            <StyledCharacter>{score}</StyledCharacter>
            <p>{scoreMessage}</p>
            <StyledLink to='/'>Go Home</StyledLink>
            <StyledLink to='/game'>PlayAgain?</StyledLink>
        </div>
    )
}
