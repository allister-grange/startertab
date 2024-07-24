/* eslint-disable @next/next/no-img-element */
/**
 * "A tile that contains just an image. It can be from url or from local file."
 * @ironhak's suggestion
 */
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import {
  imageFilePathSelector,
  imageUrlPathSelector,
} from "@/recoil/UserSettingsSelectors";
import { Box, Center, Input, Text } from "@chakra-ui/react";
import React from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface ImageTileProps {
  tileId: number;
}

export const ImageTile: React.FC<ImageTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const isEditing = useRecoilValue(sidebarOpenAtom);

  const [imageError, setImageError] = React.useState(false);

  const [fileValue, setFileValue] = useRecoilState(
    imageFilePathSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const [urlValue, setUrlValue] = useRecoilState(
    imageUrlPathSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileValue(URL.createObjectURL(event.target.files[0]));
      setUrlValue("");
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setUrlValue(event.target.value);
      setFileValue("");
    }
  };

  const getSourceForImage = () => {
    return urlValue || fileValue;
  };

  if (isEditing) {
    return (
      <Center color={color} p="5" gap="2" flexDir="column" textAlign="center">
        <Text fontSize="md" fontWeight="bold">
          Upload an image file or provide a URL
        </Text>
        <Text fontSize="sm" opacity="0.7">
          Select a file from your device
        </Text>
        <Input
          type="file"
          placeholder="Choose a file"
          _placeholder={{ color }}
          borderColor={color}
          onChange={handleFileChange}
          w="80%"
          p="1"
        />
        <Text fontSize="sm" my="1">
          or
        </Text>
        <Text fontSize="sm" opacity="0.7">
          Enter the URL of an image
        </Text>
        <Input
          type="text"
          placeholder="URL of an image"
          _placeholder={{ color }}
          borderColor={color}
          value={urlValue}
          onChange={handleUrlChange}
          w="80%"
          p="3"
        />
      </Center>
    );
  } else {
    return (
      <Box color={color} width="100%" height="100%">
        {!fileValue && !urlValue && (
          <Center h="90%" p="6" textAlign="center">
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
                w="85%"
                opacity="0.8"
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
