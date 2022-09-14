import { TwitterContext } from "@/context/TwitterContext";
import { TileId, TwitterContextInterface } from "@/types";
import { Box, Center, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { OutlinedButton } from "../ui/OutlinedButton";
import { StravaLogo } from "../ui/StravaLogo";

interface TwitterFeedTileProps {
  tileId: TileId;
}

export const TwitterFeedTile: React.FC<TwitterFeedTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, twitterData, loginWithTwitter } = useContext(
    TwitterContext
  ) as TwitterContextInterface;

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithTwitter}
          color={color}
          borderColor={color}
        >
          Continue with Twitter&nbsp;
          <StravaLogo color={"blue"} size={28} />
        </OutlinedButton>
      </Center>
    );
  }
  console.log(twitterData);

  if (!twitterData || twitterData.length === 0) {
    console.log("pls");

    return <Box>Skeleton lol</Box>;
  }

  return (
    <Box>
      {twitterData.map((tweet) => (
        <Text key={tweet.id}>{tweet.text}</Text>
      ))}
    </Box>
  );
};
