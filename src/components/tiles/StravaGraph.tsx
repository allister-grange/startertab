import { StravaContext } from "@/context/StravaContext";
import { TileId } from "@/types";
import { StravaContextInterface, StravaGraphPoint } from "@/types/strava";
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { StravaLogo } from "../ui/StravaLogo";

type PageProps = {
  tileId: TileId;
};

const StravaGraph: React.FC<PageProps> = ({ tileId }) => {
  const { isAuthenticated, stravaData, loginWithStrava } = useContext(
    StravaContext
  ) as StravaContextInterface;
  const [showingSwim, setShowingSwim] = useState<Boolean | undefined>();
  const color = `var(--text-color-${tileId})`;
  const runBoxColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(255, 255, 255, 0.1)"
  );

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <Button
          onClick={loginWithStrava}
          color={color}
          bg={"transparent"}
          border={`2px solid ${color}`}
          _focus={{ background: "transparent" }}
          _hover={{ background: "transparent", transform: "translateY(-2px)" }}
          transition="all .2s"
          shadow="md"
        >
          Continue with Strava&nbsp;
          <StravaLogo color={color} size={28} />
        </Button>
      </Center>
    );
  }

  return (
    <Box p="6">
      <Box display="flex" flexDir="row" color={color}>
        <Heading fontSize="2xl">Strava Stats</Heading>
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
          <ResponsiveContainer width="97%" height={230}>
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
          <Spinner color={color} />
        </Center>
      )}
    </Box>
  );
};

export default React.memo(StravaGraph);
