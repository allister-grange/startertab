import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";
import { TransformedNiwaData } from "../types/niwa";

interface NiwaUvGraphProps {
  niwaData: TransformedNiwaData[] | undefined;
}

export const NiwaUvGraph: React.FC<NiwaUvGraphProps> = ({ niwaData }) => {
  return (
    <div>
      {niwaData ? (
        <BarChart width={500} height={250} data={niwaData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="sunny" fill="white" />
          <Bar dataKey="cloudy" fill="#1A202C" />
        </BarChart>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
