import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Config from "../../config/config";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';


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

const theme = createTheme();

export default function Login() {
  const [loading, setloading] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      email: "mubashir1@gmail.com",
      password: "12345678",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("This is required field"),
      password: Yup.string().required("This is required field"),
    }),
    onSubmit: (values) => {
      setloading(true);
      axios
        .post(Config.API_END_POINT + "login", {
          email: values.email,
          password: values.password,
        })
        .then((resp) => {
          console.log(resp.data.message);
          dispatch({
            type: 'userData',
            payload: {
              userData: resp.data.message,
            },
          });
          setloading(false);
          history.push("/");
        })
        .catch((error) => {
          setloading(false);
          toast.error(error.response.data.message, {
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

  return (
    <ThemeProvider theme={theme}>
      {!loading && (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={formik.errors.email ? true : false}
                  helperText={formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={formik.errors.password ? true : false}
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to={"/signup"} style={{ color: "#1976d2" }}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
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
    </ThemeProvider>
  );
}
