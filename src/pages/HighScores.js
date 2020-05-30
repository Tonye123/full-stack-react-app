import React, { useState,useEffect } from 'react';
import {ScoresList} from '../styled/highScores'

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
            <h1>High Scores</h1>
            <ScoresList>
                {highScores.map(score => (
                    <li key={score.id}>
                        {score.fields.name}  - {score.fields.score}
                    </li>
                ))}
            </ScoresList>
            {error}
        </div>
    )
}
