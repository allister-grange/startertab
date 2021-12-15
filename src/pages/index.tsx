import { Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { NiwaUvGraph } from "../components/NiwaUvGraph";
import { getApiUrl } from "../helpers/getApiUrl";
import styles from "../styles/Home.module.css";
import { TransformedNiwaData } from "../types/niwa";

const Home: NextPage = () => {
  // todo make a hook
  const [niwaData, setNiwaData] = useState<undefined | TransformedNiwaData[]>();

  const getNiwaData = async () => {
    try {
      const res = await fetch(getApiUrl() + "/api/niwaUV");
      const data = (await res.json()) as TransformedNiwaData[];

      setNiwaData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <ColorModeSwitcher />
      <Box>
        <Heading>First push</Heading>
      </Box>
      <Box>
        <Button onClick={getNiwaData}>Get my data biotch</Button>
      </Box>
      <Grid p="5">
        <GridItem bg="orange" borderRadius="15" w="525px" mt="10" py="5">
          <Heading fontSize="2xl" ml="10" mb="4">
            UV Wellington
          </Heading>
          <NiwaUvGraph niwaData={niwaData} />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Home;
