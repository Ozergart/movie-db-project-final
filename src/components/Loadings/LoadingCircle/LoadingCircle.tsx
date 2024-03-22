import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const LoadingCircle = () => {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
};

export {LoadingCircle}