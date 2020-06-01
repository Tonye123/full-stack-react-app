import React, { useState,useEffect } from 'react';
import {ScoresList} from '../styled/highScores'
import { StyledTitle } from '../styled/random';

export default function () {
    const[highScores, setHighScores] = useState([])
    const[error,setError] = useState(null)

    useEffect(() => {
        const getHighScore =  async () => {
            try {
                 const res = await fetch('/.netlify/functions/getHighScores');
              
                 const result = await res.json();
                
                 setHighScores(result)
            }catch(err){
                setError(err.message)
                
            }
           
        }
        getHighScore();
             
    }, [])

    return (
        <div>
            <StyledTitle>High Scores</StyledTitle>
            <ScoresList>
                {highScores.map((score, index) => (
                    <li key={score.id}>
                     {index + 1}.   {score.fields.name}  - {score.fields.score}
                    </li>
                ))}
            </ScoresList>
            {error}
        </div>
    )
}
