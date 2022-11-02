import { TileId, TodoObject } from "@/types";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SetterOrUpdater } from "recoil";

export interface TodoListProps {
  tileId: TileId;
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

  const updateSettingsWithTodo = (todos: TodoObject[]) => {
    setTodoList(todos);
  };

  const handleTodoTicked = (todo: TodoObject) => {
    const todosToUpdates = JSON.parse(JSON.stringify(todoList)) as TodoObject[];
    const todoInState = todosToUpdates.find(
      (todoToFind) => todoToFind.date === todo.date
    );

    if (!todoInState) {
      return;
    }

    todoInState.done = !todoInState.done;
    updateSettingsWithTodo(todosToUpdates);
  };

  const handleTodoDelete = (todo: TodoObject) => {
    const todosToUpdates = [...(todoList || [])];
    const todoInStateIndex = todosToUpdates.findIndex(
      (todoToFind) => todoToFind.date === todo.date
    );

    if (todoInStateIndex === -1) {
      return;
    }

    todosToUpdates.splice(todoInStateIndex, 1);
    updateSettingsWithTodo(todosToUpdates);
  };

  const handleInputIconClick = () => {
    if (inputValue === "") {
      return;
    }
    let newTodos = [...(todoList || [])];
    newTodos.push({ done: false, title: inputValue, date: Date.now() });
    updateSettingsWithTodo(newTodos);
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
          <Text>
            {finishedTodos ? finishedTodos.length : 0} completed items
          </Text>
        </Flex>

        {showingCompletedItems ? (
          <Box>
            <ol>
              {finishedTodos?.map((todo) => (
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
                      onClick={() => handleTodoDelete(todo)}
                    />
                  </Flex>
                </li>
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
