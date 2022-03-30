import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import Config from "../../config/config";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

export default function SignUp() {
  const [loading, setloading] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "mubashir2@gmail.com",
      password: "12345678",
      name: "Mubashir Jabbar",
      contact: "My contact details",
      role: "Customer",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("This is required field"),
      password: Yup.string().min(8).required("This is required field"),
      name: Yup.string().min(5).required("This is required field"),
      contact: Yup.string().min(5).required("This is required field"),
      role: Yup.string().min(5).required("This is required field"),
    }),
    onSubmit: (values) => {
      setloading(true);
      axios
        .post(Config.API_END_POINT + "signup", {
          name: values.name,
          email: values.email,
          password: values.password,
          contact: values.contact,
          role: values.role,
        })
        .then((resp) => {
          setloading(false);
          dispatch({
            type: "name",
            payload: {
              name: values.name,
            },
          });
          history.push("/");
        })
        .catch((error) => {
          console.log(error.response);
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
      {
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
                    error={formik.errors.name ? true : false}
                    helperText={formik.errors.name}
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    name="name"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={formik.errors.email ? true : false}
                    helperText={formik.errors.email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={formik.errors.password ? true : false}
                    helperText={formik.errors.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={formik.errors.contact ? true : false}
                    helperText={formik.errors.contact}
                    required
                    fullWidth
                    id="Contact"
                    label="Contact"
                    name="contact"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={formik.errors.role ? true : false}
                    helperText={formik.errors.role}
                    required
                    fullWidth
                    id="Role"
                    label="Role"
                    name="role"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"} style={{ color: "#1976d2" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      }
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
