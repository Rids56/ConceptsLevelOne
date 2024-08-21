import PublicIcon from "@mui/icons-material/Public";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import {
  addCountry,
  updateCountry,
} from "../../../redux/Slices/Country/countrySlice";

interface FormData {
  id?: number;
  country_name: string;
  country_short_name: string;
  country_phone_code: number;
}

const schema = Joi.object({
  country_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Country Name is required",
    "string.min": "Country Name should have at least 3 characters",
    "string.max": "Country Name should have at most 50 characters",
  }),
  country_short_name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username should have at least 2 characters",
    "string.max": "Username should have at most 30 characters",
  }),
  country_phone_code: Joi.string().min(1).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 1 characters",
  }),
});

const CountryAdd = () => {
  const history = useLocation();
  const updateHistory = history?.state;
  const countryList = useAppSelector((state) => state.country.countries) || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = (data: FormData) => {
    const newData: FormData = data;

    const updatedData = {
      ...newData,
      id: updateHistory?.id,
    };

    if (updateHistory?.currentType === "add") {
      dispatch(addCountry(newData));
    } else {
      dispatch(updateCountry(updatedData));
    }
    navigate("/dashboard/countries");
    reset();
  };

  useEffect(() => {
    if (updateHistory.currentType === "edit") {
      const data = countryList?.find((e) => e.id === updateHistory?.id);
      // Set the form data for editing
      reset({
        country_name: data?.country_name,
        country_short_name: data?.country_short_name,
        country_phone_code: data?.country_phone_code,
      });
    }
  }, []);

  return (
    <div className="container">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PublicIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {updateHistory && updateHistory.currentType === "add"
              ? "Add new Country"
              : "Edit Country Details"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country_name"
                  label="Country Name"
                  autoFocus
                  {...register("country_name")}
                />
              </Grid>
              {errors.country_name && errors.country_name?.message && (
                <span className="error">{errors.country_name?.message}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country_short_name"
                  label="Country Code"
                  {...register("country_short_name")}
                />
              </Grid>
              {errors.country_short_name &&
                errors.country_short_name?.message && (
                  <span className="error">
                    {errors.country_short_name?.message}
                  </span>
                )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Code"
                  type="country_phone_code"
                  id="country_phone_code"
                  {...register("country_phone_code")}
                />
              </Grid>
              {errors.country_phone_code &&
                errors.country_phone_code?.message && (
                  <span className="error">
                    {errors.country_phone_code?.message}
                  </span>
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
                  {updateHistory && updateHistory.currentType === "add"
                    ? "Add Country"
                    : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/dashboard/countries")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default CountryAdd;