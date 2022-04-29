import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";
import { Marker } from "../../types";
import { markerDict } from "../../utils/marker";

type PlotterProps = { data: Marker[] };

const Plotter = ({ data }: PlotterProps) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [-5000, 5000], y: [-5000, 5000] }}
      domainPadding={{ x: 0, y: 0 }}
      padding={{ top: 10, bottom: 10, right: 10, left: 10 }}
      containerComponent={<VictoryZoomContainer allowPan />}
    >
      <VictoryScatter
        data={data.map((marker) => {
          return { ...marker, fill: markerDict[marker.type].color };
        })}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
            opacity: ({ datum }) => datum.opacity,
          },
        }}
      />
    </VictoryChart>
  );
};

export default Plotter;
