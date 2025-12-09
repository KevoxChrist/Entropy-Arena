import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PasswordInput from '../components/arena/PasswordInput';
import GameTimer from '../components/arena/GameTimer';
import Results from './Results';

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
    const [startTime, setStartTime] = useState(null);

    // Track password requirements
    const [requirements, setRequirements] = useState({
        hasNumber: false,
        hasSymbol: false,
        hasUppercase: false,
        hasLowercase: false
    });

    //Starting Timer if password1 has a value and is not empty
    useEffect(() => {
        if (password1 && !timerStarted) {
            setTimerStarted(true);
            setStartTime(Date.now());
        }
    }, [password1, timerStarted]);

    //Timer count down and stopping count at zero
    useEffect(() => {
        // Stop timer if results are showing, timer is at 0, or timer hasn't started
        if (showResults || timer <= 0 || !timerStarted) return;

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
    }, [timer, timerStarted, showResults]);

    //Automatically show results when timer hits 0
    useEffect(() => {
        if (timer === 0 && timerStarted) {
            setFinalTime(30); // Full 30 seconds elapsed
            setShowResults(true);
        }
    }, [timer, timerStarted]);

    //Event listener for input box 1
    const handlePassword1Change = (value, strengthData) => {
        setPassword1(value);
        setStrength1(strengthData);

        // Check password requirements
        setRequirements({
            hasNumber: /\d/.test(value),
            hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value)
        });
    };

    //Event listener for input box 2 (the confirm password box)
    const handlePassword2Change = (value, strengthData) => {
        setPassword2(value);
        setStrength2(strengthData);

        // If password2 matches password1 and both have values, show results
        if (value && password1 && value === password1) {
            // Calculate precise elapsed time in seconds with 2 decimal places
            const elapsedSeconds = (Date.now() - startTime) / 1000;
            setFinalTime(elapsedSeconds);
            setShowResults(true);
        }
    };

    //Get welcome message based on password strength
    const getWelcomeMessage = () => {
        if (!strength1) return "Welcome, Password Warrior";

        const messages = [
            "Strengthen Up, Password Warrior!",
            "More Security, Password Warrior!",
            "Getting There, Password Warrior!",
            "Strong Work, Password Warrior!",
            "Legendary, Password Warrior!"
        ];
        return messages[strength1.score];
    };

    //Get color based on password strength
    const getWelcomeColor = () => {
        if (!strength1) return "#22c55e";

        const colors = ['#d73f40', '#dc6551', '#f2b84f', '#bde952', '#3ba62f'];
        return colors[strength1.score];
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
        setStartTime(null);
        setRequirements({
            hasNumber: false,
            hasSymbol: false,
            hasUppercase: false,
            hasLowercase: false
        });
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

        <main className="arena">
            <header className="arena-header">
                <button
                    className="settings-button"
                    style={{
                        color: getWelcomeColor(),
                        borderColor: `${getWelcomeColor()}4D`,
                        textShadow: `0 0 10px ${getWelcomeColor()}4D`
                    }}
                >
                    {getWelcomeMessage()}
                </button>
                {!user && (
                    <div className="login-prompt">
                         <a href="/login">Log in</a> to save your score to the leaderboard
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
                    showRequirements={true}
                    requirements={requirements}
                />

                {/* <div className="sync-icon">⟳</div> */}
            </section>

            <footer className="arena-footer">
                {/* <button className="control-button">Tab</button>
                <button className="control-button">Enter</button> */}
                <button className="control-button" onClick={restartChallenge}>Restart Challenge</button>
            </footer>
        </main>
      
    )

}

export default Arena;
