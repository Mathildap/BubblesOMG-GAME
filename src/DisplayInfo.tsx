import React from 'react';

function DisplayInfo() {
    return (
        <div className='display-score-container'>
            <h2>
                Bubbles<span className='O'>O</span>
                <span className='M'>M</span>
                <span className='G'>G</span>
            </h2>
            <p>
                Swap the bubbles to get three or four in a row of the same
                color. <br />
                Press START to play!
            </p>
        </div>
    );
}

export default DisplayInfo;
