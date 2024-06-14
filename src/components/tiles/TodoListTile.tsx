/**
 * 1. Find out how this is stored in the DB
 * 2. Think of how to store and render categories
 * 3. Think of how to enter in categories
 * 4. Enable dragging/dropping todo tasks into categories
 */

import { TodoObject } from "@/types";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SetterOrUpdater } from "recoil";
import { TodoListItem } from "./TodoList/TodoListItem";

export interface TodoListProps {
  tileId: number;
  todoList?: TodoObject[] | undefined;
  setTodoList: SetterOrUpdater<TodoObject[] | undefined>;
}

const TodoListTile: React.FC<TodoListProps> = ({
  tileId,
  todoList,
  setTodoList,
}) => {
  const color = `var(--text-color-${tileId})`;
  const [inputValue, setInputValue] = useState("");
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
    const todosToUpdates = JSON.parse(JSON.stringify(todoList)) as TodoObject[];
    setTodoList(
      todosToUpdates.map((todoToFind) => {
        if (todo.date === todoToFind.date) {
          return { ...todoToFind, done: !todoToFind.done };
        }
        return todoToFind;
      })
    );
  };

  const handleTodoDelete = (todo: TodoObject) => {
    setTodoList(
      todoList?.filter((todoToFind) => todoToFind.date !== todo.date) || []
    );
  };

  const handleInputIconClick = () => {
    if (inputValue === "") {
      return;
    }
    setTodoList([
      ...(todoList || []),
      { done: false, title: inputValue, date: Date.now() },
    ]);
    setInputValue("");
  };

  if (!todoList) {
    setTodoList([{ date: 0, done: false, title: "Add some todos ✔️" }]);
  }

  const finishedTodos = todoList?.filter((todo) => todo.done === true);
  const unfinishedTodos = todoList?.filter((todo) => todo.done === false);

  return (
    <Box color={color} p="4" pt="4" height="100%">
      <Flex minWidth="50%" flexDir="column" mt="4">
        <Box>
          <ol>
            {unfinishedTodos?.map((todo) => (
              <TodoListItem
                todo={todo}
                handleTodoDelete={handleTodoDelete}
                handleTodoTicked={handleTodoTicked}
                color={color}
                key={todo.date + todo.title}
              />
            ))}
          </ol>
        </Box>

        <Button
          variant="link"
          display="flex"
          alignItems="center"
          gap="1"
          fontSize="sm"
          mb="3"
          opacity="0.7"
          justifyContent="flex-start"
          fontWeight="normal"
          color={color}
        >
          <AddIcon />
          <Text>Add a category</Text>
        </Button>

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
            borderColor={color}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
            placeholder={
              !unfinishedTodos || unfinishedTodos.length <= 0
                ? "Add a to-do"
                : ""
            }
            _focus={{ borderColor: color }}
            _hover={{ borderColor: color }}
          />
        </Flex>

        <Button
          variant="link"
          color={color}
          fontWeight="normal"
          justifyContent="flex-start"
          cursor="pointer"
          alignItems="center"
          opacity="0.6"
          fontSize="sm"
          onClick={() => setShowingCompletedItems(!showingCompletedItems)}
        >
          {showingCompletedItems ? (
            <ChevronDownIcon color={color} width="5" height="5" />
          ) : (
            <ChevronRightIcon color={color} width="5" height="5" />
          )}
          <Text>
            {finishedTodos ? finishedTodos.length : 0} completed items
          </Text>
        </Button>

        {showingCompletedItems ? (
          <Box>
            <ol>
              {finishedTodos?.map((todo) => (
                <TodoListItem
                  todo={todo}
                  handleTodoDelete={handleTodoDelete}
                  handleTodoTicked={handleTodoTicked}
                  color={color}
                  key={todo.date + todo.title}
                />
              ))}
            </ol>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

const areEqual = (prevProps: TodoListProps, nextProps: TodoListProps) => {
  if (!prevProps.todoList || !nextProps.todoList) {
    return false;
  }

  if (prevProps.todoList.length !== nextProps.todoList.length) {
    return false;
  }

  for (let i = 0; i < prevProps.todoList.length; i++) {
    const a = prevProps.todoList[i];
    const b = nextProps.todoList[i];

    if (a.title != b.title || a.date != b.date || a.done != b.done) {
      return false;
    }
  }

  return true;
};

export default React.memo(TodoListTile, areEqual);
