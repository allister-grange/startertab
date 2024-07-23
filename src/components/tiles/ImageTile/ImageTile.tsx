/* eslint-disable @next/next/no-img-element */
/**
 * "A tile that contains just an image. It can be from url or from local file."
 * @ironhak's suggestion
 *
 * make the state be stored in a recoil, will I only need one piece of state?
 * check all tile sizes (with errors)
 * good url
 * https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sally_Ride_%281984%29.jpg/1000px-Sally_Ride_%281984%29.jpg
 * bad url
 * https://i.sstatic.net/vw1Wj.jpg?s=64
 */
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import { Box, Center, Input, Text } from "@chakra-ui/react";
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
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

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
        {!fileValue && !urlValue && (
          <Center h="90%">
            <Text>enter editing mode to select a picture 🖼️</Text>
          </Center>
        )}
        {fileValue || urlValue ? (
          <Box width="100%" height="100%" position="relative">
            <img
              src={getSourceForImage()}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {imageError && (
              <Box
                position="absolute"
                top="45%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                color={color}
                whiteSpace="pre-wrap"
              >
                <Text>
                  failed to load your image, please check your url or file path
                  🧨
                </Text>
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    );
  }
};
