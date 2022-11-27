import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box height="100%">
      <Header />
      <Box width="100%" bg="white">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
