import type { NextPage } from "next";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import styles from "../styles/Home.module.css";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Home: NextPage = () => {
  // todo make a hook
  const [niwaData, setNiwaData] = useState({} as any);

  const getNiwaData = async () => {
    const res = await fetch(process.env.API_URL + "/api/niwaUV");
    const data = await res.json();
    console.log(data);
    
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
      </Center>
    </div>
  );
};

export default Home;
