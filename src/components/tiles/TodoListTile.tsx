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
  todoList: TodoObject[];
  setTodoList: SetterOrUpdater<TodoObject[] | undefined>;
}

interface TodoResults {
  finishedTodos: TodoObject[];
  unfinishedTodos: TodoObject[];
}

// I want the uncompleted items to be shown with their categories nested
// I want the completed list to be flattened and show no categories
const categorizeTodos = (todoList: TodoObject[]): TodoResults => {
  let finishedTodos: TodoObject[] = [];
  let unfinishedTodos: TodoObject[] = [];

  const processTodos = (todos: TodoObject[], parent: TodoObject | null) => {
    todos.forEach((todo) => {
      if (todo.done) {
        finishedTodos.push(todo);
      } else {
        if (parent) {
          const parentIndex = unfinishedTodos.findIndex(
            (t) => t.date === parent.date
          );
          if (parentIndex > -1) {
            if (!unfinishedTodos[parentIndex].subTodoListItems) {
              unfinishedTodos[parentIndex].subTodoListItems = [];
            }
            unfinishedTodos[parentIndex].subTodoListItems!.push({ ...todo });
          }
        } else {
          unfinishedTodos.push({ ...todo, subTodoListItems: [] });
        }
      }

      if (todo.subTodoListItems && todo.subTodoListItems.length > 0) {
        if (todo.done) {
          processTodos(todo.subTodoListItems, null);
        } else {
          processTodos(todo.subTodoListItems, todo);
        }
      }
    });
  };

  processTodos(todoList, null);

  return {
    finishedTodos,
    unfinishedTodos,
  };
};

const toggleCollapseAllCategories = (
  todos: TodoObject[],
  targetTodo: TodoObject
): TodoObject[] => {
  return todos.map((todo) => {
    if (todo.date === targetTodo.date) {
      return { ...todo, collapsed: !todo.collapsed };
    } else if (todo.subTodoListItems) {
      return {
        ...todo,
        subTodoListItems: toggleCollapseAllCategories(
          todo.subTodoListItems,
          targetTodo
        ),
      };
    } else {
      return todo;
    }
  });
};

const deleteTodoItem = (
  todoList: TodoObject[],
  todoToDelete: TodoObject
): TodoObject[] => {
  return todoList.reduce((updatedTodoList, todo) => {
    if (todo.date === todoToDelete.date) {
      // Skip the todo to delete it
      return updatedTodoList;
    }

    if (todo.subTodoListItems && todo.subTodoListItems.length > 0) {
      const updatedSubList = deleteTodoItem(
        todo.subTodoListItems,
        todoToDelete
      );
      if (updatedSubList.length !== todo.subTodoListItems.length) {
        updatedTodoList.push({ ...todo, subTodoListItems: updatedSubList });
      } else {
        updatedTodoList.push({ ...todo, subTodoListItems: updatedSubList });
      }
    } else {
      updatedTodoList.push(todo);
    }

    return updatedTodoList;
  }, [] as TodoObject[]);
};

const toggleTodoDone = (
  todoList: TodoObject[],
  todoToToggle: TodoObject
): TodoObject[] => {
  return todoList.map((todo) => {
    if (todo.date === todoToToggle.date) {
      return { ...todo, done: !todo.done };
    }

    if (todo.subTodoListItems && todo.subTodoListItems.length > 0) {
      const updatedSubList = toggleTodoDone(
        todo.subTodoListItems,
        todoToToggle
      );
      return { ...todo, subTodoListItems: updatedSubList };
    }

    return todo;
  });
};

const addSubCategoryToCategory = (
  todoList: TodoObject[],
  categoryToFind: TodoObject,
  newCategory: TodoObject
): TodoObject[] => {
  return todoList.map((todo) => {
    if (todo.date === categoryToFind.date) {
      // add in the node here
      const newTodo = { ...todo };
      const oldSubItems = todo.subTodoListItems
        ? [...todo.subTodoListItems]
        : [];
      newTodo.subTodoListItems = [...oldSubItems, newCategory];
      return newTodo;
    } else if (todo.subTodoListItems) {
      return {
        ...todo,
        subTodoListItems: addSubCategoryToCategory(
          todo.subTodoListItems,
          categoryToFind,
          newCategory
        ),
      };
    } else {
      return todo;
    }
  });
};

const addANewTodoToACategory = (
  todoList: TodoObject[],
  targetCategory: TodoObject,
  newTodo: TodoObject
): TodoObject[] => {
  return todoList.map((todo) => {
    if (todo.date === targetCategory.date) {
      const newSubItems = todo.subTodoListItems
        ? [newTodo, ...todo.subTodoListItems]
        : [newTodo];
      return {
        ...todo,
        subTodoListItems: newSubItems,
      };
    } else if (todo.subTodoListItems) {
      return {
        ...todo,
        subTodoListItems: addANewTodoToACategory(
          todo.subTodoListItems,
          targetCategory,
          newTodo
        ),
      };
    } else {
      return todo;
    }
  });
};

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
      handleAddingCategory(categoryInputValue);
    }
  };

  const handleAddingCategory = (
    categoryName: string,
    category?: TodoObject
  ) => {
    if (categoryName === "") {
      return;
    }

    const newCategory = {
      done: false,
      title: categoryName,
      date: Date.now(),
      isCategory: true,
    };

    if (!category) {
      setTodoList([...todoList, newCategory]);
    } else {
      setTodoList(
        addSubCategoryToCategory([...todoList], category, newCategory)
      );
    }
    setCategoryInputValue("");
  };

  const handleTodoTicked = (todo: TodoObject) => {
    setTodoList(toggleTodoDone(todoList, todo));
  };

  const handleTodoDelete = (targetTodo: TodoObject) => {
    setTodoList(deleteTodoItem(todoList, targetTodo));
  };

  const handleAddItemToCategory = (
    targetCategory: TodoObject,
    newTodo: TodoObject
  ) => {
    setTodoList(addANewTodoToACategory([...todoList], targetCategory, newTodo));
  };

  const handleInputIconClick = () => {
    if (todoInputValue === "") {
      return;
    }
    setTodoList([
      ...todoList,
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

  const handleCollapseCategoryToggle = (targetTodo: TodoObject) => {
    setTodoList((prevTodos) => {
      const newTodos = prevTodos!.map((todo) => {
        if (todo.date === targetTodo.date) {
          return { ...todo, collapsed: !todo.collapsed };
        } else if (todo.subTodoListItems) {
          return {
            ...todo,
            subTodoListItems: toggleCollapseAllCategories(
              todo.subTodoListItems,
              targetTodo
            ),
          };
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };

  const { finishedTodos, unfinishedTodos } = categorizeTodos(todoList);

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
                key={todo.date}
                handleCollapseCategoryToggle={handleCollapseCategoryToggle}
                handleAddItemToCategory={handleAddItemToCategory}
                handleAddingCategory={handleAddingCategory}
                isEditing={sidebarOpen}
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
                <AddIcon boxSize={2.5} />
                <Text>add a category</Text>
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
                ? "add a to do"
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
                  key={todo.date}
                  handleCollapseCategoryToggle={handleCollapseCategoryToggle}
                  handleAddItemToCategory={handleAddItemToCategory}
                  handleAddingCategory={handleAddingCategory}
                  isEditing={sidebarOpen}
                />
              ))}
            </ol>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default TodoListTile;
