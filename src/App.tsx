import { useEffect, useState } from "react";
import Plotter from "./components/Plotter";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  setRef,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Marker } from "./types";
import { getRandomMarker, markerDict } from "./utils/marker";
import MarkerInput from "./components/MarkerInput";
import {
  onChildAdded,
  onChildRemoved,
  push,
  ref,
  set,
} from "firebase/database";
import { database } from "./firebase";
import { addMarker, removeMarker } from "./services/markers";
import { useMarker } from "./hooks/markers";
import DeleteIcon from "@mui/icons-material/Delete";

const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: { h1: { fontSize: "3rem" } },
});

const day = "day-430";

function App() {
  const { markers, markerList } = useMarker(day);
  const submitMarker = async (marker: Marker) => {
    try {
      await addMarker(day, marker);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMarkerSubmit = (values: Partial<Marker>) => {
    submitMarker(values as Marker);
  };
  const generateRandomCoord = () => {
    submitMarker(getRandomMarker());
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ height: "100vh" }}>
            <Plotter data={markers} />
          </Box>
          <Stack spacing={2}>
            <MarkerInput onSubmit={handleMarkerSubmit} />
            <Button onClick={generateRandomCoord}>Generate Random</Button>
            <Box
              sx={{ height: "40vh", overflowY: "auto", paddingRight: "8px" }}
            >
              <List>
                {Object.entries(markerList).map(([key, marker]) => (
                  <ListItem
                    key={key}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          removeMarker(day, key);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <span
                      style={{
                        color: markerDict[marker.type].color,
                        fontWeight: "bold",
                      }}
                    >
                      {markerDict[marker.type].shortLabel}
                    </span>
                    : {marker.x}, {marker.y}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
