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
import { TransformedNiwaData } from "../types/niwa";

interface NiwaUvGraphProps {
  niwaData: TransformedNiwaData[];
}

export const NiwaUvGraph: React.FC<NiwaUvGraphProps> = ({ niwaData }) => {
  const color = useColorModeValue("white", "#222222");

  return (
    <Box pt="2" color={color} pr="4">
      <Heading fontSize="2xl" ml="8" mb="5" mt="2">
        UV Index
      </Heading>

      {niwaData ? (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={niwaData}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color} />
            <YAxis stroke={color} />
            <Line dataKey="sunny" stroke="white" strokeWidth={2} width={5} dot={false} />
            <Line dataKey="cloudy" stroke="gray" strokeWidth={2} dot={false} />
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
