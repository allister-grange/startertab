import { TileId, TodoObject } from "@/types";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon, EditIcon, SmallCloseIcon
} from "@chakra-ui/icons";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export interface TodoListProps {
  tileId: TileId;
  todoList: TodoObject[];
}

export const TodoList: React.FC<TodoListProps> = ({ tileId, todoList }) => {
  const color = `var(--text-color-${tileId})`;

  // todo switch to local storage
  const [todos, setTodos] = useState<TodoObject[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showingDelete, setShowingDelete] = useState<TodoObject | undefined>();
  const [showingCompletedItems, setShowingCompletedItems] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleInputIconClick();
    }
  };

  const handleTodoTicked = (todo: TodoObject) => {
    const todosToUpdates = [...todos];
    const todoInState = todosToUpdates.find(
      (todoToFind) => todoToFind.title === todo.title
    );

    if (!todoInState) {
      return;
    }

    todoInState.done = !todoInState.done;
    setTodos(todosToUpdates);
  };

  const handleTodoDelete = (todo: TodoObject) => {
    const todosToUpdates = [...todos];
    const todoInStateIndex = todosToUpdates.findIndex(
      (todoToFind) => todoToFind.title === todo.title
    );

    if (todoInStateIndex === -1) {
      return;
    }

    todosToUpdates.splice(todoInStateIndex, 1);
    setTodos(todosToUpdates);
  };

  const handleInputIconClick = () => {
    if (inputValue === "") {
      return;
    }
    let newTodos = [...todos];
    newTodos.push({ done: false, title: inputValue });
    setTodos(newTodos);
    setInputValue("");
  };

  const finishedTodos = todos.filter((todo) => todo.done === true);
  const unfinishedTodos = todos.filter((todo) => todo.done === false);

  return (
    <Flex
      color={color}
      flexDir="column"
      p="4"
      pt="4"
      height="100%"
      pos="relative"
    >
      <Heading bottom="2" right="3" pos="absolute" opacity="0.6" size="sm">
        Todo
      </Heading>
      <Flex minWidth="50%" flexDir="column">
        <Box>
          <ol>
            {unfinishedTodos.map((todo) => (
              <li key={todo.title} style={{ listStyle: "none" }}>
                <Flex
                  alignItems="center"
                  mb="3"
                  onMouseEnter={() => setShowingDelete(todo)}
                  onMouseLeave={() => setShowingDelete(undefined)}
                >
                  <Box
                    borderRadius="5"
                    border={`1px solid ${color}`}
                    minWidth="4"
                    minHeight="4"
                    cursor="pointer"
                    onClick={() => handleTodoTicked(todo)}
                  />
                  <Heading fontSize="14" ml="2">
                    {todo.title}
                  </Heading>
                  {todo === showingDelete ? (
                    <SmallCloseIcon
                      cursor="pointer"
                      color={color}
                      opacity="0.6"
                      ml="auto"
                      onClick={() => handleTodoDelete(todo)}
                    />
                  ) : null}
                </Flex>
              </li>
            ))}
          </ol>
        </Box>

        <Flex mb="2" alignItems="center">
          <EditIcon
            height="25"
            width="25"
            _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
            transition="all .2s ease-in-out"
            onClick={handleInputIconClick}
          />
          <Input
            size="sm"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
            _focus={{ borderColor: color }}
          />
        </Flex>
        <Flex
          cursor="pointer"
          alignItems="center"
          opacity="0.6"
          onClick={() => setShowingCompletedItems(!showingCompletedItems)}
        >
          {showingCompletedItems ? (
            <ChevronDownIcon color={color} width="5" height="5" />
          ) : (
            <ChevronRightIcon color={color} width="5" height="5" />
          )}
          <Text>{finishedTodos.length} completed items</Text>
        </Flex>

        {showingCompletedItems ? (
          <Box>
            <ol>
              {finishedTodos.map((todo) => (
                <li key={todo.title} style={{ listStyle: "none" }}>
                  <Flex alignItems="center" mb="3">
                    <CheckIcon
                      borderRadius="5"
                      border={`1px solid ${color}`}
                      minWidth="4"
                      minHeight="4"
                      cursor="pointer"
                      onClick={() => handleTodoTicked(todo)}
                    />
                    <Text fontSize="14" ml="2" textDecoration="line-through">
                      {todo.title}
                    </Text>
                    <SmallCloseIcon
                      cursor="pointer"
                      color={color}
                      opacity="0.6"
                      ml="auto"
                    />
                  </Flex>
                </li>
              ))}
            </ol>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};
