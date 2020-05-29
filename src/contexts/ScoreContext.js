import React,{createContext,useState} from 'react'


export const ScoreContext = createContext(-1)


export const ScoreProvider = ({children}) => {
    const[score, setScore ] = useState(-1)

    return (
        <ScoreContext.Provider value={[score,setScore]}>
            {children}
        </ScoreContext.Provider>
    )
}

