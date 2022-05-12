import { useLocalStorage } from "@/helpers/useLocalStorage";
import { TileId } from "@/types";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface TodoListProps {
  tileId: TileId;
}

type TodoObject = {
  done: boolean;
  title: string;
};

export const TodoList: React.FC<TodoListProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;

  // todo switch to local storage
  const [todos, setTodos] = useState<TodoObject[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showingInput, setShowingInput] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputIconClick = () => {
    let newTodos = [...todos];
    newTodos.push({ done: false, title: inputValue });
    setTodos(newTodos);
  };

  const finishedTodos = todos.filter((todo) => todo.done === true);
  const unfinishedTodos = todos.filter((todo) => todo.done === false);

  console.log(unfinishedTodos);

  return (
    <Flex
      color={color}
      flexDir="row"
      justifyContent="space-around"
      p="2"
      pt="4"
      height="100%"
    >
      <Flex
        minWidth="50%"
        borderRight={`2px ${color} solid`}
        flexDir="column"
        alignItems="center"
      >
        <Box>
          <ol>
            {unfinishedTodos.map((todo) => (
              <li
                key={todo.title}
                style={{ listStyle: "none"}}
              >
                <Heading fontSize="26">{todo.title}</Heading>
              </li>
            ))}
          </ol>
        </Box>
        <Flex mb="2" alignItems="center">
          <PlusSquareIcon
            height="25"
            width="25"
            _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
            transition="all .2s ease-in-out"
            onClick={handleInputIconClick}
          />
          <Input size="sm" value={inputValue} onChange={onInputChange} />
        </Flex>
      </Flex>

      <Box minWidth="50%">{/* <Heading size="md">Done</Heading> */}</Box>
    </Flex>
  );
};
