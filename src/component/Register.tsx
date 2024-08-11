import { LockClockOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useAppDispatch } from "../redux/hooks"
import { addUser } from "../redux/Slices/User/userSlice"
import { useNavigate } from "react-router-dom"

interface FormData {
  id: number,
  fullName: string,
  userName: string,
  password: string,
}

const schema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 50 characters',
  }),
  userName: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should have at most 30 characters',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password should have at least 6 characters',
  }),
})

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = (data: FormData) => {
    // console.log('register data', data);
    const newUser: FormData = data;
    dispatch(addUser(newUser));

    // console.log('register dispatch', dispatch(addUser(newUser)));
    navigate('/');
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
            <LockClockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleRegister)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  {...register("fullName")}
                />
              </Grid>
              {errors.fullName && errors.fullName?.message && (
                <span className="error">{errors.fullName?.message}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  {...register("userName")}
                />
              </Grid>
              {errors.userName && errors.userName?.message && (
                <span className="error">{errors.userName?.message}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </Grid>
              {errors.password && errors.password?.message && (
                <span className="error">{errors.password?.message}</span>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Register