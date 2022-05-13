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
import { StravaGraphData, StravaGraphPoint } from "@/types/strava";
import { TileId } from "@/types";

type PageProps = {
  stravaData: StravaGraphData;
  tileId: TileId;
};

export const StravaGraph: React.FC<PageProps> = ({ stravaData, tileId }) => {
  const [showingSwim, setShowingSwim] = useState<Boolean | undefined>();
  const color = `var(--text-color-${tileId})`;
  const runBoxColor = useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)");

  return (
    <Box p="6">
      <Box display="flex" flexDir="row" color={color}>
        <Heading fontSize="2xl">
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
        <Box mt="4" ml="-10">
          <ResponsiveContainer width="100%" height={240}>
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
                        stroke={color}
                        strokeWidth={2}
                        fill={runBoxColor}
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
                          stroke={color}
                          strokeWidth={2}
                          fill={runBoxColor}
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
