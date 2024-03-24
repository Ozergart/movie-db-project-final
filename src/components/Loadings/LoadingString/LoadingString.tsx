import React from 'react';
import {LinearProgress, Stack} from "@mui/material";

const LoadingString = () => {
    return (
        <div>
            <Stack sx={{width: '100%', color: 'grey.500', margin: '30px 0 0 0'}} spacing={2}>
                <LinearProgress color="secondary"/>
                <LinearProgress color="success"/>
                <LinearProgress color="inherit"/>
            </Stack>
        </div>
    );
};

export {LoadingString}