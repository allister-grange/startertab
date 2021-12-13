import type { NextPage } from "next";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import styles from "../styles/Home.module.css";
import { Center, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ColorModeSwitcher />
      <Center height="100vh">
        <Heading>First push</Heading>
      </Center>
    </div>
  );
};

export default Home;
