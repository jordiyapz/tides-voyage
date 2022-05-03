import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { signInAnonymously, User } from "firebase/auth";
import { Marker } from "./types";
import { darkTheme } from "./theme";
import { auth } from "./firebase";
import Plotter from "./components/Plotter";
import MarkerInput from "./components/MarkerInput";
import { useMarker } from "./hooks/markers";
import { addMarker, removeMarker } from "./services/markers";
import { getRandomMarker, markerDict } from "./utils/marker";

const day = "day-430";

function App() {
  const { markers, markerList } = useMarker(day);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        setUser(auth.currentUser);
      })
      .catch((error: any) => {
        // const errorCode: number = error.code;
        // const errorMessage: string = error.message;
        console.error(error);
      });
  }, []);

  const submitMarker = async (marker: Marker) => {
    if (!user) throw new Error("Authentication is required");
    try {
      await addMarker(day, marker, user?.uid);
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
          alignItems="stretch"
        >
          <Box sx={{ height: "100vh" }}>
            <Plotter data={markers} />
          </Box>
          <Stack spacing={3} sx={{ py: 5, maxHeight: "100vh" }}>
            <Box>
              {user && (
                <>
                  <Typography variant="subtitle2">
                    <b>UID:</b> {user.uid}
                  </Typography>
                </>
              )}
            </Box>
            <Stack spacing={1}>
              <MarkerInput onSubmit={handleMarkerSubmit} />
              <Button onClick={generateRandomCoord}>Generate Random</Button>
            </Stack>
            <Box sx={{ flex: 2, overflowY: "auto", paddingRight: "8px" }}>
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
