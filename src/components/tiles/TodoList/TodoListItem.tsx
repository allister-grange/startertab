import { TodoObject } from "@/types";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface TodoListItemProps {
  todo: TodoObject;
  color: string;
  handleTodoTicked: (todo: TodoObject) => void;
  handleTodoDelete: (todo: TodoObject) => void;
  depth?: number;
  handleCollapseCategoryToggle: (todo: TodoObject) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  color,
  handleTodoTicked,
  handleTodoDelete,
  depth = 0,
  handleCollapseCategoryToggle,
}) => {
  const [showingDeleteIcon, setShowingDeleteIcon] = React.useState(false);
  const renderTodoItem = () => {
    if (todo.isCategory) {
      console.log(todo);

      return (
        <Flex alignItems="center" mb="3" ml={`${depth * 20}px`}>
          <Button
            variant="link"
            display="flex"
            alignItems="center"
            gap="1"
            justifyContent="flex-start"
            fontWeight="normal"
            color={color}
            onClick={() => handleCollapseCategoryToggle(todo)}
          >
            {todo.collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
            <Text fontSize="14" ml="1" fontWeight="600">
              {todo.title}
            </Text>
          </Button>
        </Flex>
      );
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
          {showingDeleteIcon ? (
            <SmallCloseIcon
              cursor="pointer"
              color={color}
              opacity="0.6"
              ml="auto"
              onClick={() => handleTodoDelete(todo)}
            />
          ) : null}
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
                key={subTodo.title}
                todo={subTodo}
                color={color}
                handleTodoTicked={handleTodoTicked}
                handleTodoDelete={handleTodoDelete}
                depth={depth + 1}
                handleCollapseCategoryToggle={handleCollapseCategoryToggle}
              />
            ))}
          </Box>
        )}
    </Box>
  );
};
