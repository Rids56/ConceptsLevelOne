import { LockOpenRounded } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useNavigate } from "react-router-dom"
import { getOneUser } from "../redux/Slices/User/userSlice"
import { isEmpty } from "lodash"
import OpenNotification, { AlertSeverity } from "./OpenNotification"
import { useState } from "react"

type FormData = {
  userName: string,
  password: string,
}

//form filed validation apply using joi
const schema = Joi.object({
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

const SignIn = () => {
  const dispatch = useAppDispatch();
  // const registerUser = useAppSelector((state) => state.user.users);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{ type: AlertSeverity; visible: boolean; msg: string; }>({ type: 'info', visible: false, msg: '' });

  const showNotification = (type: AlertSeverity, message: string) => {
    setNotification({ type, visible: true, msg: message });
  };

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  // console.log('registerUser login', registerUser);
  // console.log('sunmitted data', errors);
  // console.log('Watch on specific var', watch('userName'));  

  const handleFormSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // console.log('submitted data', data);
    dispatch(getOneUser(data));

    const validUser = JSON.parse(sessionStorage.getItem('token') || '[]');
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    // console.log('login dispatched data outer', validUser);

    if (!isEmpty(validUser)) {
      // console.log('login dispatched success', validUser);
      reset()
      navigate('/dashboard')
    } else if (isEmpty(validUser) && isEmpty(users)) {
      return showNotification('error', 'No user found, Create new account')
    }
    else {
      return showNotification('error', 'Invalid User')
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
            <LockOpenRounded />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{ mt: 3 }}
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
                  // name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // autoComplete="new-password"

                  // after joi apply
                  // {...register("password", {
                  //   required: true,
                  //   minLength: 6,
                  // })}

                  {...register("password")}
                />
              </Grid>
              {/* after joi apply */}
              {/* {errors.password && 
                (
                  errors.password?.type === 'required'
                  ? <span className="error">This field is required</span>
                  : <span className="error">Minimum 6 characters required </span>
                )
                } */}

              {errors.password && errors.password?.message &&
                (<span className="error">{errors.password?.message}</span>)
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default SignIn