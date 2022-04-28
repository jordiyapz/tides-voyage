import React, { useState } from "react";
import Plotter from "./components/Plotter";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Marker, MarkerType, markerTypes } from "./types";
import { Form, Formik, FormikConfig, FormikProps, FormikValues } from "formik";

const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: { h1: { fontSize: "3rem" } },
});

const options = [
  { label: "Common chest", id: "chest-common" },
  ...markerTypes.map((mt) => ({ label: mt, id: mt })),
];

function App() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const formikSetup: FormikConfig<Partial<Marker>> = {
    initialValues: { type: "chest-common", x: undefined, y: undefined },
    onSubmit: (values) => {
      setMarkers((markers) => [...markers, values as Marker]);
    },
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <header>
          <Typography variant="h1">Tides Voyage</Typography>
        </header>
        <main>
          <Box sx={{ height: "80vh" }}>
            <Plotter data={markers} />
          </Box>
          <br />
          <Formik {...formikSetup}>
            {(formik) => (
              <Form>
                <Stack direction="row">
                  <Autocomplete
                    disablePortal
                    options={options}
                    defaultValue={options[0]}
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Type" />
                    )}
                    onChange={(e, val) => {
                      formik.setFieldValue("type", val, true);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Coord"
                    error={!!(formik.errors.x || formik.errors.y)}
                    helperText={formik.errors.x || formik.errors.y}
                    onChange={(e) => {
                      let values: number[] | string[] =
                        e.target.value.split(",");
                      if (values.length < 2)
                        return formik.setFieldError(
                          "x",
                          "Must be separated by commas"
                        );
                      values = values.map((v) => Number(v.trim()));
                      formik.setFieldValue("x", values[0]);
                      formik.setFieldValue("y", values[1]);
                    }}
                  />
                  {/* <TextField
                    variant="outlined"
                    label="y"
                    onChange={(e) => {
                      formik.setFieldValue("y", e.currentTarget.value);
                    }}
                  /> */}
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
