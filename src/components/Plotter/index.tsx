import { VictoryChart, VictoryScatter, VictoryZoomContainer } from "victory";
import { Marker } from "../../types";
import theme from "./theme";

type PlotterProps = { data: Marker[] };

const Plotter = ({ data }: PlotterProps) => {
  return (
    <VictoryChart
      theme={theme}
      // animate={{
      //   duration: 2000,
      //   onLoad: { duration: 1000 },
      // }}
      domain={{ x: [-100, 100], y: [-100, 100] }}
      containerComponent={<VictoryZoomContainer allowPan />}
    >
      <VictoryScatter
        style={{ data: { fill: "#c43a31" } }}
        data={data.map((marker) => {
          const color = (() => {
            switch (marker.type) {
              case "chest-common":
                return "red";
              default:
                return "green";
            }
          })();
          return { ...marker, fill: color };
        })}
      />
    </VictoryChart>
  );
};

export default Plotter;
