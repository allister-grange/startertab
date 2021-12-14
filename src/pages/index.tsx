import { Box, Button, Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import styles from "../styles/Home.module.css";
import { TransformedNiwaData } from "../types/niwa";

const Home: NextPage = () => {
  // todo make a hook
  const [niwaData, setNiwaData] = useState<undefined | TransformedNiwaData[]>();

  const getNiwaData = async () => {
    const res = await fetch(process.env.API_URL + "/api/niwaUV");
    const data = (await res.json()) as TransformedNiwaData[];

    setNiwaData(data);
  };

  return (
    <div className={styles.container}>
      <ColorModeSwitcher />
      <Center height="100vh" display={"flex"} flexDir="column">
        <Box>
          <Heading>First push</Heading>
        </Box>
        <Box>
          <Button onClick={getNiwaData}>Get my data biotch</Button>
        </Box>
        <BarChart width={730} height={250} data={niwaData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="sunny" fill="#8884d8" />
          <Bar dataKey="cloudy" fill="#82ca9d" />
        </BarChart>
      </Center>
    </div>
  );
};

export default Home;
