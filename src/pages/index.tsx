import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { axiosApi } from "../services/axiosApi";

const WithSubnavigation = dynamic(import("../components/NavBar"), {
  ssr: false,
});

import { Charts } from "../components/Charts";

import { SEO } from "../components/SEO";
import { useEffect, useState } from "react";

export default function Home() {
  const [series, setSeries] = useState([]);
  const title = "Home";
  const description = "Description Home";

  useEffect(() => {
    const inventoryExistsInLocalStorage = JSON.parse(
      localStorage.getItem("@NextE-commerce:inventory")
    );
    if (inventoryExistsInLocalStorage) {
      setSeries(inventoryExistsInLocalStorage);
    } else {
      const getInitialStateInventory = async () => {
        const response = await axiosApi.get("/getInitialStateInventory");
        setSeries(response.data);
        localStorage.setItem(
          "@NextE-commerce:inventory",
          JSON.stringify(response.data)
        );
      };
      getInitialStateInventory();
    }
  }, []);
  return (
    <>
      <SEO
        title={title}
        description={description}
        image="./bg/Getting-Started-with-NextJS.jpg"
      />
      <WithSubnavigation />
      <Box pt="80px">
        <Text as="h1" textAlign="center" mt="15px" color="gray.100"> Follow your product stocks</Text>
      </Box>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SimpleGrid flex="1" gap="4" minChildWidth="600px" align="flex-start">
            {series.map((serie, i) => (
              <Charts key={i} serie={serie} title={serie.name}></Charts>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
