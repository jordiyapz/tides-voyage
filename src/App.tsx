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
import { signInAnonymously, User } from "firebase/auth";
import { Marker, MinimalMarker, RawMarker } from "./types";
import { darkTheme } from "./theme";
import { auth } from "./firebase";
import Plotter from "./components/Plotter";
import MarkerInput from "./components/MarkerInput";
import { useMarker } from "./hooks/markers";
import { addMarker, removeMarker } from "./services/markers";
import { getRandomMarker, markerDict } from "./utils/marker";
import MarkerList from "./components/MarkerList";

const day = "day-430";

function App() {
  const { markers } = useMarker(day);
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

  const submitMarker = async (marker: MinimalMarker) => {
    if (!user) throw new Error("Authentication is required");
    try {
      await addMarker(day, marker, user?.uid);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMarkerSubmit = (values: Partial<RawMarker>) => {
    submitMarker(values as RawMarker);
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
              <MarkerList
                markers={markers}
                onDelete={(key) => {
                  removeMarker(day, key);
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
