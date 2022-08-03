import { OptionBadge } from "@/components/ui/OptionBadge";
import { StravaLogo } from "@/components/ui/StravaLogo";
import { StravaContext } from "@/context/StravaContext";
import { TileId } from "@/types";
import { StravaContextInterface, StravaGraphPoint } from "@/types/strava";
import { Box, Button, Center, Heading, Spinner } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type PageProps = {
  tileId: TileId;
};

type ActivityDisplay = "swim" | "ride" | "run";

const StravaGraphTile: React.FC<PageProps> = ({ tileId }) => {
  const { isAuthenticated, stravaData, loginWithStrava } = useContext(
    StravaContext
  ) as StravaContextInterface;
  const [activityShowing, setActivityShowing] = useState<
    ActivityDisplay | undefined
  >();
  const color = `var(--text-color-${tileId})`;

  const doesWeekHaveAnActivityInIt = (weeksActivities: StravaGraphPoint[]) =>
    weeksActivities.some((activity) => activity.distance > 0);

  if (isAuthenticated === undefined) {
    return <Box />;
  }

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
      <Box
        display="flex"
        flexDir="row"
        color={color}
        width="100%"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Strava Stats</Heading>
        <Box mr="6">
          <OptionBadge onClick={() => setActivityShowing("swim")} color={color}>
            swim
          </OptionBadge>
          <OptionBadge
            onClick={() => setActivityShowing("ride")}
            color={color}
            mr="2"
            ml="2"
          >
            ride
          </OptionBadge>
          <OptionBadge onClick={() => setActivityShowing("run")} color={color}>
            run
          </OptionBadge>
        </Box>
      </Box>
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
            {activityShowing === "swim" && (
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
            {activityShowing === "run" && (
              <Bar dataKey="run" barSize={35}>
                {stravaData.running.map(
                  (entry: StravaGraphPoint, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      stroke={color}
                      strokeWidth={1}
                      fill={"rgba(32,147,0,0.2)"}
                    />
                  )
                )}
              </Bar>
            )}
            {activityShowing === "ride" && (
              <Bar dataKey="ride" barSize={35}>
                {stravaData.riding.map(
                  (entry: StravaGraphPoint, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      stroke={"coral"}
                      strokeWidth={1}
                      fill={"rgba(255, 133, 1, 0.2"}
                    />
                  )
                )}
              </Bar>
            )}
            {activityShowing === undefined && (
              <>
                {doesWeekHaveAnActivityInIt(stravaData.running) && (
                  <Bar dataKey="run" barSize={35}>
                    {stravaData.running.map(
                      (entry: StravaGraphPoint, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke={color}
                          strokeWidth={1}
                          fill={"rgba(32,147,0,0.2)"}
                        />
                      )
                    )}
                  </Bar>
                )}
                {doesWeekHaveAnActivityInIt(stravaData.swimming) && (
                  <Bar dataKey="swim" barSize={35}>
                    {stravaData.swimming.map(
                      (entry: StravaGraphPoint, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke={"#0654A4"}
                          strokeWidth={1}
                          fill={"rgba(6, 84, 164, 0.2)"}
                        />
                      )
                    )}
                  </Bar>
                )}
                {doesWeekHaveAnActivityInIt(stravaData.riding) && (
                  <Bar dataKey="ride" barSize={35}>
                    {stravaData.riding.map(
                      (entry: StravaGraphPoint, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke={"coral"}
                          strokeWidth={1}
                          fill={"rgba(255, 133, 1, 0.2"}
                        />
                      )
                    )}
                  </Bar>
                )}
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default React.memo(StravaGraphTile);
