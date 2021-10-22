import { useState, useEffect } from 'react';
import BlueCandy from './images/blue.png';
import GreenCandy from './images/green.png';
import OrangeCandy from './images/orange.png';
import PurpleCandy from './images/purple.png';
import RedCandy from './images/red.png';
import YellowCandy from './images/yellow.png';
import blank from './images/blank.png';
const bubbleAudioSrc = require('./sounds/bubble2.wav');

interface Props {
    scoreHandler(score: number): void;
}

// BOARD SIZE
const width: number = 8;

// IMG ARRAY
const candyColors: Array<string> = [
    BlueCandy,
    GreenCandy,
    OrangeCandy,
    PurpleCandy,
    RedCandy,
    YellowCandy,
];

function GameBoard(props: Props) {
    let { scoreHandler } = props;
    let bubbleAudio = new Audio(bubbleAudioSrc.default);

    // - - - - - STATES - - - - - //
    const [currentColorArr, setCurrentColorArr] = useState<string[]>([]);
    const [squareDragged, setSquareDragged] = useState<any>(null);
    const [squareReplaced, setSquareReplaced] = useState<any>(null);

    // - - - - - CREATE BOARD - - - - - //
    const createBoard = () => {
        const randomColorArrangement: string[] = [];

        for (let i = 0; i < width * width; i++) {
            const randomColor: string =
                candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }

        setCurrentColorArr(randomColorArrangement);
    };

    // - - - - - CHECK FOR ROWS AND COLUMNS - - - - - //
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour: number[] = [
                i,
                i + width,
                i + width * 2,
                i + width * 3,
            ];
            const decidedColor: string = currentColorArr[i];
            const isBlank: boolean = currentColorArr[i] === blank;

            if (
                columnOfFour.every(
                    (square: number) =>
                        currentColorArr[square] === decidedColor && !isBlank
                )
            ) {
                columnOfFour.forEach(
                    (square: number) => (currentColorArr[square] = blank)
                );

                // SEND SCORE
                scoreHandler(4);
                bubbleAudio.play();
                return true;
            }
        }
    };

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const columnOfThree: number[] = [i, i + 1, i + 2, i + 3];
            const decidedColor: string = currentColorArr[i];
            const isBlank: boolean = currentColorArr[i] === blank;
            const notValid: number[] = [
                5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46,
                47, 53, 54, 55, 62, 63, 64,
            ];

            if (notValid.includes(i)) continue;

            if (
                columnOfThree.every(
                    (square: number) =>
                        currentColorArr[square] === decidedColor && !isBlank
                )
            ) {
                columnOfThree.forEach(
                    (square: number) => (currentColorArr[square] = blank)
                );

                // SEND SCORE
                scoreHandler(4);
                bubbleAudio.play();
                return true;
            }
        }
    };

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree: number[] = [i, i + width, i + width * 2];
            const decidedColor: string = currentColorArr[i];
            const isBlank: boolean = currentColorArr[i] === blank;

            if (
                columnOfThree.every(
                    (square: number) =>
                        currentColorArr[square] === decidedColor && !isBlank
                )
            ) {
                columnOfThree.forEach(
                    (square: number) => (currentColorArr[square] = blank)
                );

                // SEND SCORE
                scoreHandler(3);
                bubbleAudio.play();
                return true;
            }
        }
    };

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const columnOfThree: number[] = [i, i + 1, i + 2];
            const decidedColor: string = currentColorArr[i];
            const isBlank: boolean = currentColorArr[i] === blank;
            const notValid: number[] = [
                6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
            ];

            if (notValid.includes(i)) continue;

            if (
                columnOfThree.every(
                    (square: number) =>
                        currentColorArr[square] === decidedColor && !isBlank
                )
            ) {
                columnOfThree.forEach(
                    (square: number) => (currentColorArr[square] = blank)
                );

                // SEND SCORE
                scoreHandler(3);
                bubbleAudio.play();
                return true;
            }
        }
    };

    // - - - - - FILL BLANKS - - - - - //
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow: boolean = firstRow.includes(i);

            if (isFirstRow && currentColorArr[i] === blank) {
                let randomNumber: number = Math.floor(
                    Math.random() * candyColors.length
                );
                currentColorArr[i] = candyColors[randomNumber];
            }
            if (currentColorArr[i + width] === blank) {
                currentColorArr[i + width] = currentColorArr[i];
                currentColorArr[i] = blank;
            }
        }
    };

    // - - - - - DRAG FUNCTIONS - - - - - //
    const dragStart = (e: any) => {
        setSquareDragged(e.target);
    };

    const dragDrop = (e: any) => {
        setSquareReplaced(e.target);
    };

    const dragEnd = (e: any) => {
        let replacedSquareId: any = squareReplaced?.getAttribute('data-id');
        replacedSquareId = +replacedSquareId;

        let draggedSquareId: any = squareDragged?.getAttribute('data-id');
        draggedSquareId = +draggedSquareId;

        currentColorArr[replacedSquareId] = squareDragged!.getAttribute('src');

        currentColorArr[draggedSquareId] = squareReplaced!.getAttribute('src');

        const validMoves: number[] = [
            draggedSquareId - 1,
            draggedSquareId - width,
            draggedSquareId + 1,
            draggedSquareId + width,
        ];

        const validMove: boolean = validMoves.includes(replacedSquareId);

        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (
            replacedSquareId &&
            validMove &&
            (isAColumnOfFour ||
                isARowOfFour ||
                isAColumnOfThree ||
                isARowOfThree)
        ) {
            setSquareDragged(null);
            setSquareReplaced(null);
        } else {
            currentColorArr[replacedSquareId] =
                squareReplaced!.getAttribute('src');

            currentColorArr[draggedSquareId] =
                squareDragged!.getAttribute('src');
            setCurrentColorArr([...currentColorArr]);
        }
    };

    // - - - - - USE EFFECTS - - - - - //
    useEffect(() => {
        createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForColumnOfThree();
            checkForRowOfFour();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArr([...currentColorArr]);
        }, 100);
        return () => clearInterval(timer);
    }, [
        checkForColumnOfFour,
        checkForColumnOfThree,
        checkForRowOfFour,
        checkForRowOfThree,
        moveIntoSquareBelow,
        currentColorArr,
    ]);

    return (
        <div className='game-board' id='gameBoard'>
            <div className='game'>
                {currentColorArr.map((candyColor: string, index: number) => (
                    <img
                        src={candyColor}
                        key={index}
                        style={{ backgroundColor: candyColor }}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDragStart={dragStart}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
