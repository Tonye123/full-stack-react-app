import { useEffect, useState } from 'react'

 export default () => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
        console.log('usetheme' + theme)
    }

    return [ theme, toggleTheme]
}

