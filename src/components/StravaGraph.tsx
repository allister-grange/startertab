import { Box, Center, Heading, Spinner, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";
import { StravaActivity, StravaGraphData } from "../types/strava";

export const StravaGraph: React.FC = ({}) => {
  const [stravaData, setStravaData] = useState<undefined | StravaGraphData>();

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
        <Switch size="lg" />
        <Text mr="80px" ml="2">
          swim
        </Text>
      </Box>
      {stravaData ? (
        <Box mt="4">
          <ResponsiveContainer width="95%" height={250}>
            <BarChart data={stravaData.running}>
              <XAxis dataKey="day" tick={{ fontSize: 8 }} interval={0} />
              <YAxis />
              <Legend />
              <Bar dataKey="distance" fill="white" />
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
