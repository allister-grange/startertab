import { TodoObject } from "@/types";
import { CheckIcon, ChevronRightIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface TodoListItemProps {
  todo: TodoObject;
  color: string;
  handleTodoTicked: (todo: TodoObject) => void;
  handleTodoDelete: (todo: TodoObject) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  color,
  handleTodoTicked,
  handleTodoDelete,
}) => {
  const [showingDeleteIcon, setShowingDeleteIcon] = React.useState(false);

  let toReturn;

  if (todo.isCategory) {
    toReturn = (
      <Flex alignItems="center" mb="3">
        <Button
          variant="link"
          display="flex"
          alignItems="center"
          gap="1"
          justifyContent="flex-start"
          fontWeight="normal"
          color={color}
        >
          <ChevronRightIcon />
          <Text fontSize="14" ml="1" fontWeight="600">
            {todo.title}
          </Text>
        </Button>
      </Flex>
    );
  } else if (todo.done) {
    toReturn = (
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
    toReturn = (
      <Flex
        alignItems="center"
        mb="3"
        onMouseEnter={() => setShowingDeleteIcon(true)}
        onMouseLeave={() => setShowingDeleteIcon(false)}
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

  return toReturn;
};
