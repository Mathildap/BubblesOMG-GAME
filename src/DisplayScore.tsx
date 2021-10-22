interface Props {
    score: number;
    currentHS: number | undefined;
    newHighScore: number | undefined;
}

function DisplayScore(props: Props) {
    let { score, currentHS, newHighScore } = props;

    console.log('new: ', newHighScore);

    // - - - - - CLICK ON RESTART BTN - - - - - //
    const onClick = () => {
        window.location.reload();
    };

    return (
        <div className='display-score-container'>
            <h1>Your score: {score}</h1>
            <br />
            <h1>Highscore: {newHighScore ? newHighScore : currentHS} </h1>
            <button onClick={onClick}>Restart</button>
        </div>
    );
}

export default DisplayScore;
