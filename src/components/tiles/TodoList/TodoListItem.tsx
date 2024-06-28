import { TodoObject } from "@/types";
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SmallAddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

interface TodoListItemProps {
  todo: TodoObject;
  color: string;
  handleTodoTicked: (todo: TodoObject) => void;
  handleTodoDelete: (todo: TodoObject) => void;
  depth?: number;
  handleCollapseCategoryToggle: (todo: TodoObject) => void;
  handleAddItemToCategory: (
    targetCategory: TodoObject,
    newTodo: TodoObject
  ) => void;
  isEditing: boolean;
  handleAddingCategory: (categoryName: string, todo?: TodoObject) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  color,
  handleTodoTicked,
  handleTodoDelete,
  depth = 0,
  handleCollapseCategoryToggle,
  handleAddItemToCategory,
  isEditing,
  handleAddingCategory,
}) => {
  const [showingDeleteIcon, setShowingDeleteIcon] = React.useState(false);
  const [showingAddTodoListItem, setShowingAddTodoListItem] =
    React.useState(false);
  const [showingAddCategoryInput, setShowingAddCategoryInput] =
    React.useState(false);
  const [categoryInputValue, setCategoryInputValue] = React.useState("");
  const [showingAddTodoItemInput, setShowingAddTodoItemInput] =
    React.useState(false);
  const [todoInputValue, setTodoInputValue] = React.useState("");
  const categoryInputRef = React.useRef<HTMLInputElement>(null);
  const newTodoInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isEditing) {
      setCategoryInputValue("");
      setShowingAddCategoryInput(false);
    }
  }, [isEditing]);

  React.useEffect(() => {
    if (showingAddCategoryInput && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [showingAddCategoryInput]);

  /**
   * To remove the todo input when the user clicks outside of the element
   */
  React.useEffect(() => {
    if (showingAddTodoItemInput && newTodoInputRef.current) {
      newTodoInputRef.current.focus();
      document.addEventListener("mousedown", handleClickOutsideOfInput);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideOfInput);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOfInput);
    };
  }, [showingAddTodoItemInput]);

  const handleClickOutsideOfInput = (event: MouseEvent) => {
    if (
      newTodoInputRef.current &&
      !newTodoInputRef.current.contains(event.target as Node)
    ) {
      setShowingAddTodoItemInput(false);
    }
  };

  const onCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInputValue(e.target.value);
  };

  const onCategoryInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleAddingCategory(categoryInputValue, todo);
      setCategoryInputValue("");
    }
  };

  const onTodoItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInputValue(e.target.value);
  };

  const onTodoItemInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleAddItemToCategory(todo, {
        done: false,
        title: todoInputValue,
        date: Date.now(),
        isCategory: false,
      });
      setTodoInputValue("");
    }
  };

  const renderTodoItem = () => {
    if (todo.isCategory) {
      return (
        <Flex
          alignItems="center"
          mb="3"
          flexDir="column"
          ml={`${depth * 20}px`}
        >
          <Button
            onMouseEnter={() => {
              setShowingAddTodoListItem(true);
              setShowingDeleteIcon(true);
            }}
            onMouseLeave={() => {
              setShowingAddTodoListItem(false);
              setShowingDeleteIcon(false);
            }}
            variant="link"
            alignItems="center"
            gap="1"
            width="100%"
            justifyContent="flex-start"
            fontWeight="normal"
            color={color}
            onClick={() => handleCollapseCategoryToggle(todo)}
          >
            {todo.collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
            <Text fontSize="14" ml="1" fontWeight="600">
              {todo.title}
            </Text>
            {showingAddTodoListItem && (
              <Tooltip label="add a todo">
                <SmallAddIcon
                  cursor="pointer"
                  color={color}
                  opacity="0.6"
                  ml="1"
                  mt="3px"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowingAddTodoItemInput(true);
                  }}
                />
              </Tooltip>
            )}
            {showingDeleteIcon && (
              <Tooltip label="delete" ml="auto">
                <SmallCloseIcon
                  cursor="pointer"
                  color={color}
                  opacity="0.6"
                  ml="auto"
                  onClick={() => handleTodoDelete(todo)}
                />
              </Tooltip>
            )}
          </Button>
          {!todo.collapsed &&
            isEditing &&
            depth < 2 &&
            (!showingAddCategoryInput ? (
              <Button
                fontSize="sm"
                opacity="0.7"
                justifyContent="flex-start"
                variant="link"
                gap="1"
                mt="1"
                fontWeight="normal"
                mr="auto"
                ml={`${depth + 1 * 20}px`}
                color={color}
                onClick={() => setShowingAddCategoryInput(true)}
              >
                <AddIcon boxSize={2.5} />
                <Text>add sub category</Text>
              </Button>
            ) : (
              <Input
                size="xs"
                width="70%"
                mt="1"
                borderRadius="5"
                value={categoryInputValue}
                borderColor={color}
                onChange={onCategoryInputChange}
                onKeyDown={onCategoryInputKeyPress}
                placeholder={"category name"}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
                ref={categoryInputRef}
              />
            ))}
          {showingAddTodoItemInput && (
            <Input
              size="xs"
              width="65%"
              mt="1"
              borderRadius="5"
              value={todoInputValue}
              borderColor={color}
              onChange={onTodoItemInputChange}
              onKeyDown={onTodoItemInputKeyPress}
              placeholder={"new todo"}
              _focus={{ borderColor: color }}
              _hover={{ borderColor: color }}
              ref={newTodoInputRef}
            />
          )}
        </Flex>
      );
    } else if (todo.done && depth >= 1) {
      return <></>;
    } else if (todo.done) {
      return (
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
      );
    } else {
      return (
        <Flex
          alignItems="center"
          mb="3"
          onMouseEnter={() => setShowingDeleteIcon(true)}
          onMouseLeave={() => setShowingDeleteIcon(false)}
          ml={`${depth * 23}px`}
        >
          <Box
            borderRadius="5"
            border={`1px solid ${color}`}
            minWidth="4"
            minHeight="4"
            cursor="pointer"
            onClick={() => handleTodoTicked(todo)}
          />
          <Text fontSize="14" ml="2" fontWeight="600">
            {todo.title}
          </Text>
          {showingDeleteIcon && (
            <SmallCloseIcon
              cursor="pointer"
              color={color}
              opacity="0.6"
              ml="auto"
              onClick={() => handleTodoDelete(todo)}
            />
          )}
        </Flex>
      );
    }
  };

  return (
    <Box>
      {renderTodoItem()}
      {todo.subTodoListItems &&
        todo.subTodoListItems.length > 0 &&
        !todo.collapsed && (
          <Box>
            {todo.subTodoListItems.map((subTodo) => (
              <TodoListItem
                key={subTodo.date}
                todo={subTodo}
                color={color}
                handleTodoTicked={handleTodoTicked}
                handleTodoDelete={handleTodoDelete}
                handleAddItemToCategory={handleAddItemToCategory}
                handleCollapseCategoryToggle={handleCollapseCategoryToggle}
                handleAddingCategory={handleAddingCategory}
                isEditing={isEditing}
                depth={depth + 1}
              />
            ))}
          </Box>
        )}
    </Box>
  );
};
