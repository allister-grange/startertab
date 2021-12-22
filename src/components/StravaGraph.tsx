import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StravaActivity } from "../types/strava";

export const StravaGraph: React.FC = ({}) => {
  const [stravaData, setStravaData] = useState<undefined | StravaActivity[]>();

  useEffect(() => {
    const makeCallToStravaApi = async () => {
      try {
        const res = await fetch(
          `/api/strava`
        );

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
      {stravaData ? (
        <Box>hellooo</Box>
      ) : (
        <Center height="280px">
          <Spinner />
        </Center>
      )}
    </Box>
  );
};
