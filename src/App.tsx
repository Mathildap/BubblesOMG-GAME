import { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import ScoreTime from './ScoreTime';
import DisplayScore from './DisplayScore';
import DisplayInfo from './DisplayInfo';
const endAudioSrc = require('./sounds/gameover.wav');

let timer: any;

function App() {
    // - - - - - STATES - - - - - //
    const [start, setStart] = useState<boolean>();
    const [endGameBtn, setEndGameBtn] = useState<boolean>();
    let [time, setTime] = useState<number>(5);
    let [score, setScore] = useState<number>(0);
    const [printScore, setPrintScore] = useState<boolean>();
    let [currentHighScore, setCurrentHighScore] = useState<number>();
    let [newHighScore, setNewHighScore] = useState<number>();
    let gameOverAudio = new Audio(endAudioSrc.default);

    // - - - - - USE EFFECTS - - - - - //
    // START TIMER
    useEffect(() => {
        if (start) {
            timeCountDown();
        }
    }, [start, time]);

    // CLICK ON END GAME
    useEffect(() => {
        if (endGameBtn) {
            gameOverAudio.play();
            setStart(false);
            setPrintScore(true);
            checkHighScore();
            document.getElementById('startBtn')!.style.display = 'none';
        }
    }, [endGameBtn]);

    useEffect(() => {
        if (time === 0) {
            gameOverAudio.play();
        }
    }, [start]);

    // CHECK LOCALSTORAGE
    useEffect(() => {
        if (!localStorage.getItem('HS')) {
            localStorage.setItem('HS', '0');
        } else {
            let getHS: any = localStorage.getItem('HS');
            let parseHS: number = parseInt(getHS);
            setCurrentHighScore(parseHS);
        }
    }, []);

    // - - - - - TIMER - - - - - //
    const timeCountDown = () => {
        timer = setTimeout(() => {
            time--;
            setTime(time);

            if (time <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    };

    // - - - - - SCORE HANDLER - - - - - //
    const scoreHandler = (addScore: number) => {
        setScore(score + addScore);
    };

    const checkHighScore = () => {
        if (!start && currentHighScore! < score) {
            setNewHighScore(score);
            let stringHS = score.toString();
            localStorage.setItem('HS', stringHS);
        }
    };

    // - - - - - END GAME - - - - - //
    const endGame = () => {
        setTime(0);
        setStart(false);
        setPrintScore(true);
        checkHighScore();
        document.getElementById('stopBtn')!.style.display = 'none';
    };

    return (
        <main>
            <ScoreTime
                startGame={(info: boolean) => setStart(info)}
                endGameBtn={(info: boolean) => setEndGameBtn(info)}
                score={score}
                time={time}
            />
            {!start && !endGameBtn && !printScore ? <DisplayInfo /> : ''}
            {start ? <GameBoard scoreHandler={scoreHandler} /> : null}
            {printScore ? (
                <DisplayScore
                    score={score}
                    currentHS={currentHighScore}
                    newHighScore={newHighScore}
                />
            ) : null}
        </main>
    );
}

export default App;
