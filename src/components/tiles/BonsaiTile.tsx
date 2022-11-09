import React, { useEffect, useState } from "react";
import { getBonsaiBase, grow } from "@/helpers/bonsaiHelpers";
import * as BONSAI from "@/helpers/bonsaiHelpers";
import { ShootType } from "@/types/bonsai";
import { Box, Text } from "@chakra-ui/react";
import { TileId } from "@/types";
import { SetterOrUpdater, useRecoilState } from "recoil";
import {
  bonsaiBaseColorSelector,
  bonsaiTrunkColorSelector,
} from "@/recoil/UserSettingsSelectors";

type BonsaiProps = {
  tileId: TileId;
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
  const [baseColor] = useRecoilState(bonsaiBaseColorSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [trunkColor] = useRecoilState(bonsaiTrunkColorSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];

  const resetBonsai = async () => {
    const array = getEmptyBonsai();
    setBonsai(array);
  };

  const growBonsai = async () => {
    await resetBonsai();

    const startYPos = BONSAI.rows - 1;
    const startXPos = Math.round(BONSAI.cols / 2) - 1;
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
