import { UvGraphData } from "@/types";
import {
  Box,
  Center,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface UvGraphProps {
  uvData: UvGraphData[];
}

export const UvGraph: React.FC<UvGraphProps> = ({ uvData }) => {
  const color = "var(--text-color-tile-10)";

  return (
    <Box p="6" color={color} >
      <Heading fontSize="2xl" >
        UV Index
      </Heading>

      <Box mt="4" ml="-10">
      {uvData ? (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={uvData}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color} />
            <YAxis stroke={color} />
            <Line dataKey="value" stroke={color} type="basis"  strokeWidth={2} width={5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Center minH="250px">
          <Spinner color="white" />
        </Center>
      )}
      </Box>
    </Box>
  );
};
