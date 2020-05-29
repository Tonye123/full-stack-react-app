import React, { useState,useEffect, useCallback, useContext } from 'react'
import { StyledGame, StyledScore, StyledTimer, StyledCharacter } from '../styled/game'
import { StyledStrong } from '../styled/random'
import { useHistory } from 'react-router-dom';
import { ScoreContext } from '../contexts/ScoreContext';

export default function Game() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const [score, setScore] = useContext(ScoreContext);
    const MAX_SECONDS = 5;
    const [currentCharacter, setCurrentCharacter] = useState('');
    const [ms,setMs] = useState(999)
    const [seconds, setSeconds] = useState(MAX_SECONDS)
    const history = useHistory()


    useEffect(() => {
        setRandomCharacter();
        setScore(0)
        const currentTime = new Date();
        const interval = setInterval(()=> updateTime(currentTime),1)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const updateTime = (startTime) => {
        const endTime = new Date();
        const msPassStr = (
            endTime.getTime() - startTime.getTime()
        ).toString();
        const formattedMSString = ('0000' + msPassStr).slice(-5);
        const updatedSeconds = 
        MAX_SECONDS - parseInt(formattedMSString.substring(0,2)) - 1;
        const updatedMs = 
            1000 -
            parseInt(formattedMSString.substring(formattedMSString.length - 3));

            setSeconds(addLeadingZeros(updatedSeconds,2))
            setMs(addLeadingZeros(updatedMs,3))
    }

    const addLeadingZeros = (num,length) => {
        let zeros = '';
        for(let i=0; i<length; i++) {
            zeros += '0';
        }
        return (zeros + num).slice(-length);
    }

    useEffect(() => {
        if(seconds <= -1) {
            history.push('/gameOver')

        }
     
    }, [seconds])
    const keyUpHandler = useCallback((e) => {
       
        if(e.key === currentCharacter) {
            setScore(prev => prev + 1)
        } else {
            if(score > 0) {
                setScore(prev => prev -1)
            }
        }

        setRandomCharacter();
    }
    ,[currentCharacter])
    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        
        return () => {
            document.removeEventListener('keyup', keyUpHandler)
        }
    }, [keyUpHandler])

    const setRandomCharacter = () => {
        let characterIndex = Math.floor(Math.random() * characters.length) 
        setCurrentCharacter(characters[characterIndex])
    }

    return (
        <StyledGame>
           <StyledScore>Score: <StyledStrong>{score}</StyledStrong> </StyledScore>
           <StyledCharacter>{currentCharacter}</StyledCharacter>
    <StyledTimer>Time: <StyledStrong>{seconds}:{ms}</StyledStrong>  </StyledTimer>
           
        </StyledGame>
    )
}
