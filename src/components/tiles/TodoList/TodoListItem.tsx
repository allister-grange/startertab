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
  handleAddItemToCategory: (todo: TodoObject) => void;
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

  React.useEffect(() => {
    if (!isEditing) {
      setCategoryInputValue("");
      setShowingAddCategoryInput(false);
    }
  }, [isEditing]);

  const onCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInputValue(e.target.value);
  };

  const onCategoryInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleAddingCategory(categoryInputValue, todo);
      setCategoryInputValue("");
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
                    handleAddItemToCategory(todo);
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
                color={color}
                onClick={() => setShowingAddCategoryInput(true)}
              >
                <AddIcon boxSize={2.5} />
                <Text>add sub category</Text>
              </Button>
            ) : (
              <Input
                size="xs"
                width="67%"
                mt="1"
                value={categoryInputValue}
                borderColor={color}
                onChange={onCategoryInputChange}
                onKeyDown={onCategoryInputKeyPress}
                placeholder={"category name"}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
            ))}
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
