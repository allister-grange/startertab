import { Box, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { TransformedNiwaData } from "../types/niwa";

interface NiwaUvGraphProps {
  niwaData: TransformedNiwaData[];
}

export const NiwaUvGraph: React.FC<NiwaUvGraphProps> = ({ niwaData }) => {
  return (
    <Box pt="2" color="#222834">
      <Heading fontSize="2xl" ml="5" mb="5" mt="2">
        UV Index Wellington
      </Heading>

      {niwaData ? (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={niwaData}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} />
            <YAxis />
            <Legend />
            <Bar dataKey="sunny" fill="white" />
            <Bar dataKey="cloudy" fill="#1A202C" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Center minH="250px">
          <Spinner color="white" />
        </Center>
      )}
    </Box>
  );
};
