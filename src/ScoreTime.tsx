import { useState } from 'react';

interface Props {
    startGame(info: boolean): void;
    endGameBtn(info: boolean): void;
    score: number;
    time: number;
}

function ScoreTime(props: Props) {
    let { startGame, endGameBtn, score, time } = props;

    // STATE
    let [startButton, setStartButton] = useState<boolean>(false);

    // - - - - - CLICK ON START - - - - - //
    const start = () => {
        startGame(true);
        setStartButton(true);
    };

    // - - - - - CLICK ON END GAME - - - - - //
    const stop = () => {
        startGame(false);
        endGameBtn(true);
        setStartButton(false);
    };

    return (
        <section>
            <h1>{score}</h1>
            {!startButton ? (
                <button onClick={start} id='startBtn'>
                    Start
                </button>
            ) : (
                <button onClick={stop} id='stopBtn'>
                    End game
                </button>
            )}

            <h1>{time <= 9 ? '00:0' + time : '00:' + time}</h1>
        </section>
    );
}

export default ScoreTime;
