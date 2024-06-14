import { TodoObject } from "@/types";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { TodoListItem } from "./TodoList/TodoListItem";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";

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
  const [todoInputValue, setTodoInputValue] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [showingCompletedItems, setShowingCompletedItems] = useState(false);
  const [showingAddCategoryInput, setShowingAddCategoryInput] = useState(false);
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);

  const onTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInputValue(e.target.value);
  };

  const onTodoInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleInputIconClick();
    }
  };

  const onCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInputValue(e.target.value);
  };

  const onCategoryInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleAddingCategory();
    }
  };

  const handleAddingCategory = () => {
    if (categoryInputValue === "") {
      return;
    }
    setTodoList([
      ...(todoList || []),
      {
        done: false,
        title: categoryInputValue,
        date: Date.now(),
        isCategory: true,
      },
    ]);
    setCategoryInputValue("");
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
    if (todoInputValue === "") {
      return;
    }
    setTodoList([
      ...(todoList || []),
      {
        done: false,
        title: todoInputValue,
        date: Date.now(),
        isCategory: false,
      },
    ]);
    setTodoInputValue("");
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

        {sidebarOpen && (
          <Box mb="3">
            {showingAddCategoryInput ? (
              // TODO do I need an icon here?
              <Input
                size="sm"
                value={categoryInputValue}
                borderColor={color}
                onChange={onCategoryInputChange}
                onKeyDown={onCategoryInputKeyPress}
                placeholder={"category name"}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
            ) : (
              <Button
                variant="link"
                display="flex"
                alignItems="center"
                gap="1"
                fontSize="sm"
                opacity="0.7"
                justifyContent="flex-start"
                fontWeight="normal"
                color={color}
                onClick={() => setShowingAddCategoryInput(true)}
              >
                <AddIcon />
                <Text>Add a category</Text>
              </Button>
            )}
          </Box>
        )}

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
            value={todoInputValue}
            borderColor={color}
            onChange={onTodoInputChange}
            onKeyDown={onTodoInputKeyPress}
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
