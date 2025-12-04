import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PasswordInput from '../components/arena/PasswordInput';
import GameTimer from '../components/arena/GameTimer';
import Results from './Results';
import Header from '../components/Header2';
import '../styles/Arena.css';

//Things we need:
//1. Validate that password2 has the same string value as password 1.
// If so, then insert the user's entropy score on the dom.
//2. Add event listener to password2 so that it will launch into the results page

function Arena(){
    const { user } = useAuth();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [strength1, setStrength1] = useState(null);
    const [strength2, setStrength2] = useState(null);
    const [timer, setTimer] = useState(30);
    const [timerStarted, setTimerStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [finalTime, setFinalTime] = useState(null);

    //Starting Timer if password1 has a value and is not empty
    useEffect(() => {
        if (password1 && !timerStarted) {
            setTimerStarted(true);
        }
    }, [password1, timerStarted]);

    //Timer count down and stopping count at zero
    useEffect(() => {
        if (timer <= 0 || !timerStarted) return;

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, timerStarted]);

    //Event listener for input box 1
    const handlePassword1Change = (value, strengthData) => {
        setPassword1(value);
        setStrength1(strengthData);
    };

    //Event listener for input box 2 (the confirm password box)
    const handlePassword2Change = (value, strengthData) => {
        setPassword2(value);
        setStrength2(strengthData);

        // If password2 matches password1 and both have values, show results
        if (value && password1 && value === password1) {
            setFinalTime(timer); // Capture the exact time when passwords match
            setShowResults(true);
        }
    };

    //Restart Challenge
    const restartChallenge = () => {
        setPassword1('');
        setPassword2('');
        setStrength1(null);
        setStrength2(null);
        setTimer(30);
        setTimerStarted(false);
        setShowResults(false);
        setFinalTime(null);
    };






    if (showResults) {
        return (
            <Results
                password1Data={strength1}
                password2Data={strength2}
                timeRemaining={finalTime}
                onRestart={restartChallenge}
            />
        );
    }

    return(
       <>
        {/* <Header/> */}
        <main className="arena">
            <header className="arena-header">
                <button className="settings-button">Test Settings =3=</button>
                {!user && (
                    <div className="login-prompt">
                         <a href="/Login">Log in</a> to save your score to the leaderboard
                    </div>
                )}
            </header>

            <GameTimer time={timer} />

            <section className="password-battle">
                <PasswordInput
                    value={password1}
                    onChange={handlePassword1Change}
                    placeholder="Enter password"
                />

                <PasswordInput
                    value={password2}
                    onChange={handlePassword2Change}
                    placeholder="Enter password"
                />

                {/* <div className="sync-icon">⟳</div> */}
            </section>

            <footer className="arena-footer">
                {/* <button className="control-button">Tab</button>
                <button className="control-button">Enter</button> */}
                <button className="control-button" onClick={restartChallenge}>Restart Challenge</button>
            </footer>
        </main>
        </>
    )

}

export default Arena;
