import { Box, Center, Heading, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
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

  const color = useColorModeValue("white", "#222222");

  return (
    <Box pt="2" color={color} pr="4">
      <Heading fontSize="2xl" ml="8" mb="5" mt="2">
        UV Index
      </Heading>

      {niwaData ? (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={niwaData}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color}/>
            <YAxis stroke={color} />
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
