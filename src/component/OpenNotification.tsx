
import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//// variant could be success, error, warning, info, or default
export type AlertSeverity = "success" | "error" | "warning" | "info";

type Props = {
    severity: AlertSeverity,
    visible: boolean,
    msg: string,
    onClose: () => void;
}

const OpenNotification = ({ severity, visible, msg, onClose, ...props}: Props) => {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <div>
            <Snackbar open={visible} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default OpenNotification;