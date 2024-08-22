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
  addState,
  updateState,
} from "../../../redux/Slices/State/stateSlice";
import { State } from "../../../redux/Slices/State/stateSlice";

interface FormData extends State {
}



const StateAdd = () => {
  const history = useLocation();
  const updateHistory = history?.state;
  const stateList = useAppSelector((state) => state.state.states) || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = Joi.object({
    state_name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "State Name is required",
      "string.min": "State Name should have at least 3 characters",
      "string.max": "State Name should have at most 50 characters",
    }),
    country_name: updateHistory.currentType === "add" ?
      Joi.string().min(3).max(50).required().messages({
        "string.empty": "Country Name is required",
        "string.min": "Country Name should have at least 3 characters",
        "string.max": "Country Name should have at most 50 characters",
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
      dispatch(addState(newData));
    } else {
      dispatch(updateState(updatedData));
    }
    navigate("/dashboard/states", {
      state: {
        selectedCountry: updateHistory?.selectedCountry
      }
    });
    reset();
  };

  useEffect(() => {
    if (updateHistory.currentType === "edit") {
      const data = stateList?.find((e) => e.id === updateHistory?.id);
      // Set the form data for editing
      reset({
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
              ? "Add new State"
              : "Edit State Details"}
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
                  id="state_name"
                  label="State Name"
                  autoFocus
                  {...register("state_name")}
                />
              </Grid>
              {errors.state_name && errors.state_name?.message && (
                <span className="error">{errors.state_name?.message}</span>
              )}

              {(updateHistory && updateHistory.currentType === "add")
                ? (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
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
                      id="country_name"
                      label="Country Name"
                      {...register("country_name")}
                    />
                  </Grid>
                )}
              {(updateHistory && updateHistory.currentType === "add") && errors.country_name && errors.country_name?.message && (
                <span className="error">{errors.country_name?.message}</span>
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
                    ? "Add State"
                    : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/dashboard/states", {
                    state: {
                      selectedCountry: updateHistory?.selectedCountry
                    }
                  })}
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

export default StateAdd;