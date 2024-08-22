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
  addCity,
  City,
  updateCity,
} from "../../../redux/Slices/City/citySlice";

interface FormData extends City {}

const CityAdd = () => {
  const history = useLocation();
  const updateHistory = history?.state;
  const cityList = useAppSelector((city) => city.city.cities) || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = Joi.object({
    city_name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "City Name is required",
      "string.min": "City Name should have at least 3 characters",
      "string.max": "City Name should have at most 50 characters",
    }),
    country_name:
      updateHistory.currentType === "add"
        ? Joi.string().min(3).max(50).required().messages({
            "string.empty": "Country Name is required",
            "string.min": "Country Name should have at least 3 characters",
            "string.max": "Country Name should have at most 50 characters",
          })
        : Joi.string().optional(),
    state_name:
      updateHistory.currentType === "add"
        ? Joi.string().min(3).max(50).required().messages({
            "string.empty": "State Name is required",
            "string.min": "State Name should have at least 3 characters",
            "string.max": "State Name should have at most 50 characters",
          })
        : Joi.string().optional(),
  });

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
      dispatch(addCity(newData));
    } else {
      dispatch(updateCity(updatedData));
    }
    navigate("/dashboard/cities", {
      state: {
        selectedCountry: updateHistory?.selectedCountry,
        selectedState: updateHistory?.selectedState,
      },
    });
    reset();
  };

  useEffect(() => {
    if (updateHistory.currentType === "edit") {
      const data = cityList?.find((e) => e.id === updateHistory?.id);
      // Set the form data for editing
      reset({
        city_name: data?.city_name,
        state_name: data?.state_name,
        country_name: data?.country_name,
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
              ? "Add new City"
              : "Edit City Details"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {updateHistory && updateHistory.currentType === "add" ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    id="country_name"
                    label="Country Name"
                    {...register("country_name")}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    disabled={true}
                    fullWidth
                    autoFocus
                    id="country_name"
                    label="Country Name"
                    {...register("country_name")}
                  />
                </Grid>
              )}
              {updateHistory &&
                updateHistory.currentType === "add" &&
                errors.country_name &&
                errors.country_name?.message && (
                  <span className="error">{errors.country_name?.message}</span>
                )}

              {updateHistory && updateHistory.currentType === "add" ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="state_name"
                    label="State Name"
                    {...register("state_name")}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    required
                    disabled={true}
                    fullWidth
                    id="state_name"
                    label="State Name"
                    {...register("state_name")}
                  />
                </Grid>
              )}

              {updateHistory &&
                updateHistory.currentType === "add" &&
                errors.state_name &&
                errors.state_name?.message && (
                  <span className="error">{errors.state_name?.message}</span>
                )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city_name"
                  label="City Name"
                  {...register("city_name")}
                />
              </Grid>
              {errors.city_name && errors.city_name?.message && (
                <span className="error">{errors.city_name?.message}</span>
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
                    ? "Add City"
                    : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() =>
                    navigate("/dashboard/cities", {
                      state: {
                        selectedCountry: updateHistory?.selectedCountry,
                        selectedState: updateHistory?.selectedState,
                      },
                    })
                  }
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

export default CityAdd;
