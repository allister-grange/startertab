import { Box, Button, Center, Heading, Spinner } from "@chakra-ui/react";
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
      <Heading ml="10" mt="4" fontSize="2xl">Strava Stats</Heading>
      {stravaData ? (
        <Box m="4" >
          <ResponsiveContainer width="95%" height={400}>
            <BarChart data={stravaData.running}>
              <XAxis dataKey="day" tick={{ fontSize: 8 }} interval={0}/>
              <YAxis />
              <Legend />
              <Bar dataKey="distance" fill="cyan" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Center height="280px">
          <Spinner />
        </Center>
      )}
    </Box>
  );
};
