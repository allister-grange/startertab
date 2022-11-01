import { favoriteLinksSelector } from "@/components/recoil/UserSettingsSelectors";
import { FavoriteLink, TileId } from "@/types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { OutlinedButton } from "../ui/OutlinedButton";

interface FavoriteLinksTileProps {
  tileId: TileId;
}

export const FavoriteLinksTile: React.FC<FavoriteLinksTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;
  const [favoriteLinks, setFavoriteLinks] = useRecoilState(
    favoriteLinksSelector(tileId)
  ) as [
    FavoriteLink[] | undefined,
    SetterOrUpdater<FavoriteLink[] | undefined>
  ];
  const [showingInputForm, setShowingInputForm] = useState(
    !(favoriteLinks && favoriteLinks.length > 0)
  );
  const [deleteShortcutId, setDeleteShortcutId] = useState(-10);

  const onNewShortcutSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      url: { value: string };
      shortcutName: { value: string };
    };

    const url = target.url.value;
    const shortcutName = target.shortcutName.value;
    const favicon = "https://startertab.com/favicon.ico";

    if (favoriteLinks) {
      setFavoriteLinks([
        ...favoriteLinks,
        {
          url: url,
          id: favoriteLinks[favoriteLinks.length - 1].id + 1,
          name: shortcutName,
          favicon,
        },
      ]);
    } else {
      setFavoriteLinks([
        {
          url: url,
          id: 1,
          name: shortcutName,
          favicon,
        },
      ]);
    }
    setShowingInputForm(false);
  };

  return (
    <Box color={color} px="6" py="4">
      {showingInputForm ? (
        <Box width="100%" alignItems="center">
          <form onSubmit={onNewShortcutSubmit}>
            <FormControl>
              <FormLabel>Link</FormLabel>
              <Input
                width="200px"
                size="sm"
                borderColor={color}
                name="url"
                placeholder={"Add a link"}
                _placeholder={{
                  color,
                }}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Shortcut Name</FormLabel>
              <Input
                width="200px"
                size="sm"
                name="shortcutName"
                borderColor={color}
                placeholder={"Add a name for the link"}
                _placeholder={{
                  color,
                }}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
              {/* <FormHelperText color={color}>
              Short hand name for the link to display as{" "}
            </FormHelperText> */}
            </FormControl>
            <FormControl mt="6">
              <OutlinedButton
                outline={`1px solid ${color}`}
                type="submit"
                fontSize="sm"
              >
                Create shortcut
              </OutlinedButton>
            </FormControl>
          </form>
        </Box>
      ) : (
        <UnorderedList>
          {favoriteLinks?.map((shortcut) => (
            <ListItem
              key={shortcut.url}
              onMouseEnter={() => setDeleteShortcutId(shortcut.id)}
            >
              <Link href={shortcut.url}>{shortcut.name}</Link>
              {deleteShortcutId === shortcut.id && <Button>X</Button>}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      <Box width="100%" pos="absolute" bottom="1" right="1">
        <OutlinedButton
          fontSize="xs"
          marginLeft="auto"
          display="block"
          shadow="none"
          onClick={() => setShowingInputForm(true)}
        >
          Add link
        </OutlinedButton>
      </Box>
    </Box>
  );
};
