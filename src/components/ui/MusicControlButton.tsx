import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface MusicControlButtonProps extends ButtonProps {
  onClickHandler: () => void;
  playable: boolean;
}

export const MusicControlButton: React.FC<MusicControlButtonProps> = ({
  children,
  onClickHandler,
  playable
}) => {

  const hover = playable ? { transform: "scale(1.1)" } : { transform: "scale(1.0)" };
  const opacity = playable ? "1.0" : ".3";
  const onClick = playable ? onClickHandler : () => {}
  
  return (
    <Button
      variant="unstyled"
      _focus={{ borderWidth: 0 }}
      transition={"all .2s"}
      _hover={hover}
      onClick={onClick}
      disabled={!playable}
      opacity={opacity}
    >
      {children}
    </Button>
  );
};
