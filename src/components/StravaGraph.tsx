import {
  Box,
  Center,
  Heading,
  Spinner,
  Switch,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell, ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { StravaGraphData, StravaGraphPoint } from "../types/strava";

export const StravaGraph: React.FC = ({}) => {
  const [stravaData, setStravaData] = useState<undefined | StravaGraphData>();
  const [showingSwim, setShowingSwim] = useState(false);

  useEffect(() => {
    const makeCallToStravaApi = async () => {
      try {
        const res = await fetch(`/api/strava`);

        const data = await res.json();

        setStravaData(data);
      } catch (err) {
        console.error(err);
      }
    };

    makeCallToStravaApi();
  }, []);

  return (
    <Box>
      <Box display="flex" flexDir="row" mt="2">
        <Heading ml="10" fontSize="2xl">
          Strava Stats
        </Heading>
        <Text ml="auto" mr="2">
          run
        </Text>
        <Switch
          size="lg"
          onChange={() => setShowingSwim((showingSwimming) => !showingSwimming)}
        />
        <Text mr="80px" ml="2">
          swim
        </Text>
      </Box>
      {stravaData ? (
        <Box mt="4">
          <ResponsiveContainer width="95%" height={250}>
            <BarChart
              data={showingSwim ? stravaData.swimming : stravaData.running}
            >
              <XAxis
                label={undefined}
                dataKey="day"
                tick={{ fontSize: 12 }}
                interval={0}
                stroke="white"
              />
              <YAxis stroke="white" />
              <Bar dataKey="distance" barSize={35}>
                {stravaData.swimming.map((entry: StravaGraphPoint, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    stroke={showingSwim ? "#0654A4" : "white"}
                    strokeWidth={2}
                    fill={
                      showingSwim
                        ? "rgba(6, 84, 164, 0.2)"
                        : "rgba(255, 255, 255, 0.2)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Center height="200px">
          <Spinner />
        </Center>
      )}
    </Box>
  );
};
