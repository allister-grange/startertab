/* eslint-disable @next/next/no-img-element */
/**
 * "A tile that contains just an image. It can be from url or from local file."
 * @ironhak's suggestion
 */
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import { Box, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface ImageTileProps {
  tileId: number;
}

export const ImageTile: React.FC<ImageTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const isEditing = useRecoilValue(sidebarOpenAtom);

  const [fileValue, setFileValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileValue(event.target.value);
    if (event.target.value) {
      setUrlValue("");
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
    if (event.target.value) {
      setFileValue("");
    }
  };

  const getSourceForImage = () => {
    return urlValue || URL.createObjectURL(new Blob([fileValue]));
  };

  if (isEditing) {
    return (
      <Box color={color} p="6" gap="3" display="flex">
        <form>
          <Input
            type="file"
            placeholder="Choose a file"
            _placeholder={{ color }}
            borderColor={color}
            value={fileValue}
            onChange={handleFileChange}
          />
          <Text>Or </Text>
          <Input
            type="text"
            placeholder="Image URL"
            _placeholder={{ color }}
            borderColor={color}
            value={urlValue}
            onChange={handleUrlChange}
          />
        </form>
      </Box>
    );
  } else {
    return (
      <Box color={color} width="100%" height="100%">
        <img
          src={getSourceForImage()}
          alt="image of your choosing, from a file or the internet"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    );
  }
};
