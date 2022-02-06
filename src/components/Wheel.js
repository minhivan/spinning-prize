import { React, useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import confetti from 'canvas-confetti';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(to right, rgb(255, 81, 47) 0%, rgb(221, 36, 118) 51%, rgb(255, 81, 47) 100%)',
        border: 0,
        borderRadius: '15px !important',
        boxShadow: '0 0 10px #eee !important',
        color: 'white',
        height: 48,
        padding: '30px 60px !important',
        backgroundSize: '200% auto',
        fontWeight: 'bold !important',
        width: '220px'
    },
    reset: {
        background: 'linear-gradient(to right, rgb(255, 81, 47) 0%, rgb(221, 36, 118) 51%, rgb(255, 81, 47) 100%)',
        border: 0,
        borderRadius: '15px !important',
        boxShadow: '0 0 10px #eee !important',
        color: 'white',
        height: 48,
        padding: '30px 60px !important',
        backgroundSize: '200% auto',
        fontWeight: 'bold !important',
        width: '220px'
    },
    buttonHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    },
    spin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        margin: '30px auto',
        alignItems: 'center',
        overflow: 'hidden'
    },
    alert: {
        fontSize: 20
    }
});


const item = [
    {
        id: '10',
        image: './money/10.jpeg',
        text: '10.000đ',
    },
    {
        id: '20',
        image: './money/20.jpeg',
        text: '20.000đ',
    },
    {
        id: '20',
        image: './money/20.jpeg',
        text: '20.000đ',
    },
    {
        id: '50',
        image: './money/50.jpeg',
        text: '50.000đ',
    },
    {
        id: '50',
        image: './money/50.jpeg',
        text: '50.000đ',
    },
    {
        id: '100',
        image: './money/100.jpeg',
        text: '100.000đ',
    },
    {
        id: '200',
        image: './money/200.jpeg',
        text: '200.000đ',
    },
];

const other = [
    {
        id: 'again',
        image: './icons/restart.png',
        text: 'Quay lại',
    },
    {
        id: 'unlucky',
        image: './icons/lol.jpeg',
        text: 'Chúc may mắn lần sau',
    },
]

const pro = [
    {
        id: '500',
        image: './money/500.jpeg',
        text: '500.000đ',
    },
]



const reproductionArray = (array = [], length = 0) => [
    ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
];

const _ = require("lodash");
function shuffle(array) {
    let shuffled_array = _.shuffle(array);
    return shuffled_array
}


// const getPrizes = () => [
//     ...reproductionArray(goods, 10),
//     ...goods,
//     ...reproductionArray(goods, 10),
//     ...goods,
//     ...reproductionArray(goods, 10),
//     ...reproductionArray(goods, 10),
// ];

const getPrizes = () => [
    ...item,
    ...item,
    ...item,
    ...item,
    ...item,
    ...other,
    ...item
];


let prizes = shuffle(getPrizes());
// let prizes = getPrizes();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getRandomGoodIndex = () => getRandomInt(17, prizes.length - 1);

function WheelSpin() {
    const classes = useStyles();
    const [start, setStart] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')


    const handleStart = () => {
        const newPrizeNumber = getRandomGoodIndex();
        setPrizeIndex(newPrizeNumber)
        setStart(true)
        setSpinning(true);
        setText(prizes[newPrizeNumber].text);
        console.log(prizes[newPrizeNumber]);
        console.log(newPrizeNumber);
    };

    const handlePrizeDefined = useCallback(() => {
        console.log('🥳 Prize defined! 🥳');
        setOpen(true);
    }, []);

    const handleReset = () => {
        setPrizeIndex(0);
        setStart(false);
        setSpinning(false);
        setOpen(false);
        prizes = shuffle(prizes);
    };

    useEffect(() => {
        open && confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, [open]);

    return (
        <>
            <div className={classes.spin}>
                <RoulettePro
                    prizes={prizes}
                    prizeIndex={prizeIndex}
                    start={start}
                    spinningTime={8}
                    onPrizeDefined={handlePrizeDefined}
                    prizeWidth={210}
                />
            </div>
            {
                open ? (
                    <Alert
                        className={classes.alert}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >

                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 3 }}
                    >
                        Bạn đã trúng {text}
                    </Alert>
                ) : null
            }
            <div className={classes.buttonHolder}>
                <Button className={classes.root} variant="contained" onClick={handleStart} disabled={spinning}>QUAY NGAY</Button>
                <Button className={classes.reset} variant="contained" onClick={handleReset} disabled={!spinning}>TẠO LẠI</Button>
            </div>

            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal> */}
        </>
    );
}

export default WheelSpin;
