import { Badge, BadgeProps } from "@chakra-ui/react";
import React from "react";

interface OptionBadgeProps extends BadgeProps {
  color: string;
}

export const OptionBadge: React.FC<OptionBadgeProps> = ({ color, ...props }) => {
  return (
    <Badge
      _hover={{ cursor: "pointer", transform: "translateY(-1px)" }}
      _focus={{ cursor: "pointer", transform: "translateY(-1px)" }}
      _active={{transform: "translateY(0px)"}}
      fontSize="xs"
      transition={"all .2s"}
      background="transparent"
      border={`1px solid ${color}`}
      color={color}
      paddingX="2"
      paddingY="1"
      borderRadius="5px"
      {...props}
    >
      {props.children}
    </Badge>
  );
};
