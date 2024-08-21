import { joiResolver } from '@hookform/resolvers/joi'
import { LockResetRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updatePassword } from '../redux/Slices/User/userSlice'
import { isEmpty } from 'lodash'
import OpenNotification, { AlertSeverity } from './OpenNotification'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FormData = {
    userName: string,
    newPassword: string,
    confirmPassword: string,
}

const schema = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 30 characters',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should have at least 6 characters',
    }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        // .custom((value, helpers) => {
        //     console.log('sunmitted error', value, helpers);
        //     if (value === '') {
        //         return helpers.message('Confirm password is required')
        //     }
        //     if (value !== helpers.state.ancestors[0].newPassword) {
        //         return helpers.message('Passwords do not match');
        //       }
        //       return value;
        // })
        .messages({
            'string.empty': 'Confirm password is required',
            'any.only': 'Password and Confirm password not match',
        }),
})

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const existingUsers = useAppSelector((state) => state.user.users);
    const [notification, setNotification] = useState<{ type: AlertSeverity; visible: boolean; msg: string; }>({ type: 'info', visible: false, msg: '' });

    const showNotification = (type: AlertSeverity, message: string) => {
        setNotification({ type, visible: true, msg: message });
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: joiResolver(schema),
    });

    const handleConfirmPassword: SubmitHandler<FormData> = (data: FormData) => {
        const userAvailable = existingUsers?.find((e) => e.userName === data.userName) || [];
        if (!isEmpty(userAvailable)) {
            dispatch(updatePassword({ userName: data.userName, password: data.newPassword }));
            navigate('/')
        } else {
            return showNotification('error', 'User not exist with this Username')
        }
        reset();
    }
    return (
        <div className="container">
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockResetRounded />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create New Password
                    </Typography>
                    <Box
                        component="form"
                        noValidate sx={{ mt: 3 }}
                        onSubmit={handleSubmit(handleConfirmPassword)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    // autoComplete="given-name"
                                    // name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                    {...register("userName")}
                                />
                            </Grid>
                            {errors.userName && errors.userName?.message &&
                                (<span className="error">{errors.userName?.message}</span>)
                            }
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="New Password"
                                    type="NewPassword"
                                    id="NewPassword"
                                    {...register('newPassword')}
                                />
                            </Grid>
                            {errors.newPassword && errors.newPassword?.message && (
                                <span className="error">{errors.newPassword?.message}</span>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    type="confirmPassword"
                                    id="confirmPassword"
                                    {...register('confirmPassword')}
                                />
                            </Grid>
                            {errors.confirmPassword && errors.confirmPassword?.message && (
                                <span className="error">{errors.confirmPassword?.message}</span>
                            )}
                        </Grid>

                        <Grid container>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="reset"
                                    // fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Go to Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <OpenNotification
                severity={notification.type}
                visible={notification.visible}
                msg={notification.msg}
                onClose={() => setNotification({ visible: false, msg: '', type: 'info' })}
            />
        </div>
    )
}

export default ForgotPassword