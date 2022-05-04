import { IconButton, List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Marker } from "../../types";

type MarkerListProps = {
  markers: Marker[];
  onDelete: (key: Marker["key"]) => void;
};

const MarkerList = ({ markers, onDelete }: MarkerListProps) => {
  return (
    <List>
      {markers.map((marker) => (
        <ListItem
          key={marker.key}
          disableGutters
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              size="small"
              onClick={(e) => onDelete(marker.key)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <span
            style={{
              color: marker.color,
              fontWeight: "bold",
            }}
          >
            {marker.shortLabel}
          </span>
          : {marker.x}, {marker.y}
        </ListItem>
      ))}
    </List>
  );
};

export default MarkerList;
