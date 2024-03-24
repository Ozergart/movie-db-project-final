import React from 'react';
import {LinearProgress, Stack} from "@mui/material";

import css from "../../MoviesCont/Movies.module.css";

const LoadingString = () => {
    return (
        <div>
            <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2} className={css.loading}>
                <LinearProgress color="secondary"/>
                <LinearProgress color="success"/>
                <LinearProgress color="inherit"/>
            </Stack>
        </div>
    );
};

export {LoadingString}