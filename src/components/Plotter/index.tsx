import {
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";
import { Marker, RawMarker } from "../../types";
import { markerDict } from "../../utils/marker";

type PlotterProps = { data: Marker[]; fontSize?: string | number };
// type MarkerDatum =
const Plotter = ({ data, fontSize = "10px" }: PlotterProps) => {
  console.debug(data);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [-5000, 5000], y: [-5000, 5000] }}
      domainPadding={{ x: 0, y: 0 }}
      padding={{ top: 10, bottom: 10, right: 10, left: 10 }}
      containerComponent={<VictoryZoomContainer allowPan />}
    >
      <VictoryScatter
        data={data}
        labelComponent={<VictoryTooltip />}
        labels={({ datum }: { datum: Marker }) => [
          datum.name,
          `(${datum.x}, ${datum.y})`,
        ]}
        style={{
          data: {
            fill: ({ datum }) => datum.color,
            opacity: ({ datum }) => datum.opacity,
          },
          labels: {
            fontSize,
            fill: "black",
          },
        }}
      />
      <VictoryAxis style={{ tickLabels: { fontSize } }} />
      <VictoryAxis dependentAxis style={{ tickLabels: { fontSize } }} />
    </VictoryChart>
  );
};

export default Plotter;
