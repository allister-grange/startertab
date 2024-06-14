import { TodoObject } from "@/types";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
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

  return (
    <li key={todo.title} style={{ listStyle: "none" }}>
      {todo.done ? (
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
      ) : (
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
      )}
    </li>
  );
};
