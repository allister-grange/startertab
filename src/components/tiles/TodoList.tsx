import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, TodoObject, UserSettingsContextInterface } from "@/types";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useState } from "react";

export interface TodoListProps {
  tileId: TileId;
  todoList: TodoObject[] | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({ tileId, todoList }) => {
  const color = `var(--text-color-${tileId})`;
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [todos, setTodos] = useState<TodoObject[]>(
    todoList ? todoList : [{ date: 0, done: false, title: "Add some todos ✔️" }]
  );
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
    const newSettings = cloneDeep(settings);
    const currentTheme = getCurrentTheme(newSettings, colorMode);

    currentTheme[tileId].todoList = todos;
    setSettings(newSettings);
  };

  const handleTodoTicked = (todo: TodoObject) => {
    const todosToUpdates = [...todos];
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
    const newTodos = [...todos];
    const todoInStateIndex = newTodos.findIndex(
      (todoToFind) => todoToFind.date === todo.date
    );

    if (todoInStateIndex === -1) {
      return;
    }

    newTodos.splice(todoInStateIndex, 1);
    updateSettingsWithTodo(newTodos);
  };

  const handleInputIconClick = () => {
    if (inputValue === "") {
      return;
    }
    let newTodos = [...todos];
    newTodos.push({ done: false, title: inputValue, date: Date.now() });
    updateSettingsWithTodo(newTodos);
    setInputValue("");
  };

  useEffect(() => {
    const currentTheme = getCurrentTheme(settings, colorMode);
    const todosFromSettings = currentTheme[tileId].todoList;

    if (!todosFromSettings) {
      setTodos([{ date: 0, done: false, title: "Add some todos ✔️" }]);
    } else {
      setTodos(todosFromSettings);
    }
  }, [colorMode, settings, tileId]);

  const finishedTodos = todos.filter((todo) => todo.done === true);
  const unfinishedTodos = todos.filter((todo) => todo.done === false);

  console.log(todos.length);
  
  return (
    <Box color={color} p="4" pt="4" height="100%">
      <Flex minWidth="50%" flexDir="column" mt="4">
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
            borderColor={color}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
            placeholder={unfinishedTodos.length <= 0 ? "Add a to-do" : ""}
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
