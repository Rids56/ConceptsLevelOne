import { joiResolver } from '@hookform/resolvers/joi'
import { LockResetRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
    newPassword: string,
    confirmPassword: string,
}

const schema = Joi.object({
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
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
        resolver: joiResolver(schema),
    });

    // console.log('sunmitted error', errors);

    const handleConfirmPassword: SubmitHandler<FormData> = (data: FormData) => {
        console.log('Confirm data', data);
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
                                    required
                                    fullWidth
                                    label="New Password"
                                    type="NewPassword"
                                    id="NewPassword"
                                    autoFocus
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
        </div>
    )
}

export default ForgotPassword