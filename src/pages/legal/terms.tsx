import { Footer } from "@/components/ui/Footer";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface indexProps {}

const TermsAndConditionsPage: React.FC<indexProps> = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <Box>
      <Flex
        width={["100%", "90%", "70%", "60%", "50%"]}
        mx="auto"
        pt="6"
        px="2"
        maxW="1000px"
        color="black"
        flexDir="column"
        height="100%"
        justifyContent="space-between"
        pb="10"
      >
        <Box mb="6">
          <Heading fontWeight="800">Terms and Conditions</Heading>
          <Text fontSize="sm" color="gray.500" mt="2">
            Last update: 27/01/2023
          </Text>
          <Heading as="h2" fontSize={"xl"} mt="6">
            1. Agreement
          </Heading>
          <Text mt="2">
            Usage of the website is offered to the user on an &quot;as is&quot;
            and &quot;as available&quot; basis. The website makes no
            representations or warranties of any kind, express or implied, as to
            the operation of the site or the information, content, materials, or
            products included on the site.
          </Text>
          <Heading as="h2" fontSize={"xl"} mt="6">
            2. Disclaimer
          </Heading>
          <Text mt="2">
            The website will not be liable for any damages of any kind arising
            from the use of this site, including, but not limited to direct,
            indirect, incidental, punitive, and consequential damages.
          </Text>
          <Heading as="h2" fontSize={"xl"} mt="6">
            3. Use License
          </Heading>
          <Text mt="2">
            The website uses open-source software licensed under the GNU General
            Public License (GPL). The GPL is a legal agreement that allows users
            to freely use, modify, and distribute the software. By using the
            website, you agree to be bound by the terms of the GPL. Any software
            provided on the website that is covered by the GPL must be made
            available to users in the form of its source code. This means that
            users have the right to access and modify the code, as long as they
            also make the modified code available under the GPL.
          </Text>
          <Heading as="h2" fontSize={"xl"} mt="6">
            4. Links
          </Heading>
          <Text mt="2">
            StarterTab has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by OpenSay of the
            site. Use of any such linked website is at the user&apos;s own risk.
          </Text>
          <Heading as="h2" fontSize={"xl"} mt="6">
            5. Modifications
          </Heading>
          <Text mt="2">
            The website reserves the right to modify these terms of service at
            any time without notice to the user. By using the website, the user
            agrees to be bound by these terms of service.
          </Text>
          <Text mt="6">Thank you for using StarterTab 😎</Text>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default TermsAndConditionsPage;
