import * as BONSAI from "@/helpers/bonsaiHelpers";
import { getBonsaiBase, grow } from "@/helpers/bonsaiHelpers";
import {
  bonsaiBaseColorSelector,
  bonsaiTrunkColorSelector,
} from "@/recoil/UserSettingsSelectors";
import { ShootType } from "@/types/bonsai";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type BonsaiProps = {
  tileId: number;
};

const getEmptyBonsai = (): string[][] => {
  const arrayOfSpaces = [];
  for (let i = 0; i < BONSAI.rows; i += 1) {
    arrayOfSpaces[i] = new Array(BONSAI.cols);
    for (let j = 0; j < BONSAI.cols; j += 1) {
      arrayOfSpaces[i][j] = "\u00A0";
    }
  }
  return arrayOfSpaces;
};

export const BonsaiTile: React.FC<BonsaiProps> = ({ tileId }): JSX.Element => {
  const [bonsai, setBonsai] = useState<string[][]>(getEmptyBonsai());
  const baseColor = useRecoilValue(bonsaiBaseColorSelector(tileId));
  const trunkColor = useRecoilValue(bonsaiTrunkColorSelector(tileId));

  const resetBonsai = async () => {
    const array = getEmptyBonsai();
    setBonsai(array);
  };

  const growBonsai = async () => {
    await resetBonsai();

    const startYPos = BONSAI.rows - 1;
    const startXPos = Math.floor(BONSAI.cols / 2) - 2;

    grow(
      startYPos,
      startXPos,
      BONSAI.lives,
      0,
      ShootType.trunk,
      bonsai,
      setBonsai
    );
  };

  useEffect(() => {
    const startGrowing = async () => {
      growBonsai();
    };
    startGrowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box pos="absolute" bottom="3.7rem">
        {bonsai.map((line, idx) => {
          const joinedLine = line.join("");
          return (
            <Text
              color={trunkColor}
              lineHeight={"0.75rem"}
              key={idx}
              dangerouslySetInnerHTML={{ __html: joinedLine }}
            />
          );
        })}
      </Box>
      <Box pos="absolute" bottom="1" left="61">
        {getBonsaiBase(trunkColor, baseColor)
          .split("\n")
          .map((val, idx) => (
            <Text
              color={baseColor}
              lineHeight="0.8rem"
              fontSize="0.8rem"
              key={idx}
              dangerouslySetInnerHTML={{ __html: val }}
            />
          ))}
      </Box>
    </Box>
  );
};
