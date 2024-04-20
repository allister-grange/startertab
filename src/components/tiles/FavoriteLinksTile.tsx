import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import {
  favoriteLinksSelector,
  favoriteLinksTitleSelector,
} from "@/recoil/UserSettingsSelectors";
import { FavoriteLink } from "@/types";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface FavoriteLinksTileProps {
  tileId: number;
}

export const FavoriteLinksTile: React.FC<FavoriteLinksTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;
  const divRef = useRef<HTMLDivElement | null>(null);
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const [favoriteLinks, setFavoriteLinks] = useRecoilState(
    favoriteLinksSelector(tileId)
  ) as [
    FavoriteLink[] | undefined,
    SetterOrUpdater<FavoriteLink[] | undefined>
  ];
  const favoriteLinksTitle = useRecoilValue(favoriteLinksTitleSelector(tileId));
  const [showingInputForm, setShowingInputForm] = useState(
    !(favoriteLinks && favoriteLinks.length > 0)
  );
  const [deleteShortcutId, setDeleteShortcutId] = useState("");
  const [displayingOnWideTile, setDisplayingOnWideTile] = useState(false);

  React.useEffect(() => {
    if (!divRef.current) {
      return;
    }

    if (divRef.current.offsetWidth > 300) {
      setDisplayingOnWideTile(true);
    }
  }, []);

  const onNewShortcutSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      url: { value: string };
      shortcutName: { value: string };
    };

    const url = target.url.value;
    const shortcutName = target.shortcutName.value;
    const favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=64`;

    setFavoriteLinks([
      ...(favoriteLinks || []),
      {
        url: url,
        id: (Math.random() + 1).toString(36).substring(7),
        name: shortcutName,
        favicon,
      },
    ]);
    setShowingInputForm(false);
  };

  const handleShortcutDelete = (shortcutId: string) => {
    setFavoriteLinks(favoriteLinks?.filter((link) => link.id !== shortcutId));
  };

  return (
    <Box color={color} px="4" py="3" ref={divRef}>
      {showingInputForm ? (
        <Box width="100%" alignItems="center">
          <form onSubmit={onNewShortcutSubmit}>
            <FormControl isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                width="200px"
                size="md"
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
            <FormControl mt="4" isRequired>
              <FormLabel>Shortcut Name</FormLabel>
              <Input
                width="200px"
                size="md"
                name="shortcutName"
                borderColor={color}
                placeholder={"Add a name for the link"}
                _placeholder={{
                  color,
                }}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
            </FormControl>
            <FormControl mt="6">
              <OutlinedButton
                borderColor={`1px solid ${color}`}
                outline={`1px solid ${color}`}
                type="submit"
                fontSize="sm"
              >
                Create shortcut
              </OutlinedButton>
              <OutlinedButton
                fontSize="xs"
                display="block"
                shadow="none"
                p="0"
                ml="2px"
                mt="4"
                onClick={() => setShowingInputForm(false)}
              >
                Take me back
              </OutlinedButton>
            </FormControl>
          </form>
        </Box>
      ) : (
        <Box>
          {favoriteLinksTitle && (
            <Text fontSize="xl">{favoriteLinksTitle}</Text>
          )}
          <UnorderedList
            listStyleType="none"
            m="0"
            mt={favoriteLinksTitle && "2"}
            overflow={displayingOnWideTile ? "flow" : "hidden"}
            display="flex"
            flexDirection="column"
            flexWrap={displayingOnWideTile ? "wrap" : undefined}
            gap="4px"
            columnGap="6"
          >
            {favoriteLinks?.map((shortcut) => (
              <ListItem
                key={shortcut.id}
                onMouseEnter={() => setDeleteShortcutId(shortcut.id)}
                onMouseLeave={() => setDeleteShortcutId("")}
                display="flex"
                alignItems="center"
                flexDir="row"
              >
                <Link
                  target="_top"
                  href={
                    shortcut.url.startsWith("http")
                      ? shortcut.url
                      : `//${shortcut.url}`
                  }
                  display="flex"
                  alignItems="center"
                  flexDir="row"
                  wordBreak="break-word"
                  transition="all .2s"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  <Image
                    height="4"
                    src={shortcut.favicon}
                    alt="Favicon for shortcut url"
                    mr="4"
                    mt="1px"
                  />
                  {shortcut.name}
                </Link>
                {deleteShortcutId === shortcut.id && (
                  <SmallCloseIcon
                    cursor="pointer"
                    color={color}
                    opacity="0.6"
                    ml="auto"
                    onClick={() => handleShortcutDelete(shortcut.id)}
                  />
                )}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
      {sidebarOpen && (
        <Box pos="absolute" bottom="0" right="3">
          {!showingInputForm && (
            <OutlinedButton
              fontSize="xs"
              marginLeft="auto"
              display="block"
              shadow="none"
              pos="sticky"
              onClick={() => setShowingInputForm(true)}
            >
              Add link
            </OutlinedButton>
          )}
        </Box>
      )}
    </Box>
  );
};
