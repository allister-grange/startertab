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
  const color = useColorModeValue("white", "#222222");

  return (
    <Box pt="2" color={color} pr="4">
      <Heading fontSize="2xl" ml="8" mb="5" mt="2">
        UV Index
      </Heading>

      {uvData ? (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={uvData}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color} />
            <YAxis stroke={color} />
            <Line dataKey="value" stroke="white"type="basis"  strokeWidth={2} width={5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Center minH="250px">
          <Spinner color="white" />
        </Center>
      )}
    </Box>
  );
};
