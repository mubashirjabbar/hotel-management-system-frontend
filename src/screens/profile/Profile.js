import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Config from "../../config/config";
import Header from "../../components/header/Header";

const mdTheme = createTheme();

function UserProfileUpdate() {
  const [loading, setloading] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const states = useSelector((state) => state);

  let { name, contact, id } = states?.userData;

  const formik = useFormik({
    initialValues: {
      name: name,
      contact: contact,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5).required("This is required field"),
      contact: Yup.string().min(5).required("This is required field"),
    }),
    onSubmit: (values) => {
      setloading(true);
      axios
        .put(Config.API_END_POINT + `users/${id}`, {
          name: values.name,
          contact: values?.contact,
        })
        .then((resp) => {
          toast.success("Successfully profile updated", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: "userData",
            payload: {
              userData: resp?.data,
            },
          });
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          toast.error(error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright all reserved © "}
        {/* <Link color="inherit" href="https://mui.com/"> */}
        Hotel Management System
        {/* </Link>{" "} */}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <>
      {!loading && (
        <ThemeProvider theme={mdTheme}>
          <div>
            <Header
              leftHeader={"User Profile"}
              rightHeader={"Logout"}
              onClickLeftHeader={() => {
                history.push("/login");
              }}
            />
          </div>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Profile
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="family-name"
                      error={formik.errors.name ? true : false}
                      helperText={formik.errors.name}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="contact"
                      label="contact"
                      name="contact"
                      autoComplete="family-name"
                      error={formik.errors.contact ? true : false}
                      helperText={formik.errors.contact}
                      onChange={formik.handleChange}
                      value={formik.values.contact}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
                <Grid container justifyContent="center">
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
      {loading && (
        <div
          style={{
            width: "100%",
            height: 800,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default function Profile() {
  return <UserProfileUpdate />;
}
