import {
  Box,
  Center,
  Heading,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { StravaGraphData, StravaGraphPoint } from "../types/strava";

type PageProps = {
  stravaData: StravaGraphData;
};

export const StravaGraph: React.FC<PageProps> = ({ stravaData }) => {
  const [showingSwim, setShowingSwim] = useState<Boolean | undefined>();
  const color = useColorModeValue("white", "#222222");

  return (
    <Box>
      <Box display="flex" flexDir="row" mt="2" color={color}>
        <Heading fontSize="2xl" ml="10">
          Strava Stats
        </Heading>
        <Text ml="auto" mr="2">
          run
        </Text>
        <Switch
          size="lg"
          onChange={() => {
            if (showingSwim === undefined) {
              setShowingSwim(true);
            } else {
              setShowingSwim((showingSwim) => !showingSwim);
            }
          }}
        />
        <Text mr="80px" ml="2">
          swim
        </Text>
      </Box>
      {stravaData ? (
        <Box mt="4">
          <ResponsiveContainer width="95%" height={240}>
            <BarChart data={stravaData.combinedData}>
              <XAxis
                label={undefined}
                dataKey="day"
                tick={{ fontSize: 12 }}
                interval={0}
                stroke={color}
              />
              <YAxis stroke={color} />
              {showingSwim === true && (
                <Bar dataKey="swim" barSize={35}>
                  {stravaData.swimming.map(
                    (entry: StravaGraphPoint, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        stroke={"#0654A4"}
                        strokeWidth={2}
                        fill={"rgba(6, 84, 164, 0.2)"}
                      />
                    )
                  )}
                </Bar>
              )}
              {showingSwim === false && (
                <Bar dataKey="run" barSize={35}>
                  {stravaData.swimming.map(
                    (entry: StravaGraphPoint, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        stroke={"white"}
                        strokeWidth={2}
                        fill={"rgba(255, 255, 255, 0.2)"}
                      />
                    )
                  )}
                </Bar>
              )}
              {showingSwim === undefined && (
                <>
                  <Bar dataKey="run" barSize={35}>
                    {stravaData.swimming.map(
                      (entry: StravaGraphPoint, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke={"white"}
                          strokeWidth={2}
                          fill={"rgba(255, 255, 255, 0.2)"}
                        />
                      )
                    )}
                  </Bar>
                  <Bar dataKey="swim" barSize={35}>
                    {stravaData.swimming.map(
                      (entry: StravaGraphPoint, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke={"#0654A4"}
                          strokeWidth={2}
                          fill={"rgba(6, 84, 164, 0.2)"}
                        />
                      )
                    )}
                  </Bar>
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Center minHeight="265px">
          <Spinner color="white" />
        </Center>
      )}
    </Box>
  );
};
