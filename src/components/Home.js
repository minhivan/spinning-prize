import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(to right, #F27121, #E94057, #8A2387)',
        border: 0,
        borderRadius: '15px !important',
        boxShadow: '0 0 10px #eee !important',
        color: 'white',
        height: 48,
        padding: '30px 60px !important',
        backgroundSize: '200% auto',
        fontWeight: 'bold !important'
    }
});

function Home() {
    const classes = useStyles();
    return (
        <div className='background'>
            
            <Box className='button-holder'>
                <Button href='/play' className={classes.root} variant="contained">NHẤN ĐỂ QUAY !</Button>
            </Box>
        </div>
    );
}

export default Home;
