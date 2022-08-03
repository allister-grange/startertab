import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
let acorn = require("acorn");

interface JavascriptConsoleTileProps {
  tileId: string;
}

export const JavascriptConsoleTile: React.FC<JavascriptConsoleTileProps> = ({
  tileId,
}) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [inputHeight, setInputHeight] = useState(1);
  const color = `var(--text-color-${tileId})`;

  const handleInputSubmit = () => {
    try {
      console.log("here");
      const crap = eval(code);
      // const crap = acorn.parse(code, { ecmaVersion: 2020 });
      console.log("yup");

      console.log("crap", crap.body);

      setOutput(crap);
      setCode("");
      setInputHeight(1);
    } catch (err) {
      //todo display to the user that their code sucks D
      console.log(err);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      console.log("shift enter");

      setInputHeight(inputHeight + 1);
    } else if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <Flex
      height="100%"
      pos="relative"
      color={color}
      p="4"
      justifyContent={"space-between"}
      flexDir="column"
    >
      <Text>{output}</Text>
      <Textarea
        // pos="absolute"
        // bottom="0"
        onKeyDown={onKeyPress}
        placeholder="Type js here"
        value={code}
        rows={inputHeight * 1}
        // height={`${inputHeight * 40}px`}
        onChange={(e) => setCode(e.target.value)}
      />
    </Flex>
  );
};
