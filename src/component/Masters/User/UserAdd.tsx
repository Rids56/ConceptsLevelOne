import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"

import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { addUser, updateUser } from "../../../redux/Slices/User/userSlice"
import { useEffect } from 'react';

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
});

const UserAdd = () => {
  const history = useLocation();
  const currentData = history?.state;
  const userlist = useAppSelector((state) => state.user.users) || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = (data: FormData) => {
    const newUser: FormData = data;
    const updatedData = {
      ...newUser,
      id: currentData?.id,
    }

    if (currentData?.currentType === 'add') {
      dispatch(addUser(newUser))
    } else {
      dispatch(updateUser(updatedData))
    }
    navigate('/dashboard/users');
    reset();
  }

  useEffect(() => {
    if (currentData?.currentType === 'edit' && currentData?.id && userlist) {
      const user = userlist?.find((e) => e.id === currentData?.id);

      reset({
        fullName: user?.fullName,
        userName: user?.userName,
        password: user?.password,
      })
    }
  }, []);

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
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {currentData && currentData?.currentType === 'add' ? 'Add new User' : 'Edit User'}
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

            <Grid container>
              <Grid item xs>
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {(currentData && currentData?.currentType === 'add') ? 'Add User' : 'Submit'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate('/dashboard/users')}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default UserAdd;