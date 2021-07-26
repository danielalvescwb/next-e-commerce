import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { axiosApi } from "../../services/axiosApi";
import { SEO } from "../../components/SEO";
import dynamic from "next/dynamic";
import { InventoryModalCreate } from "../../components/Modal/Inventory/Create";

const WithSubnavigation = dynamic(import("../../components/NavBar"), {
  ssr: false,
});

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    const inventoryExistsInLocalStorage = JSON.parse(
      localStorage.getItem("@NextE-commerce:inventory")
    );
    if (inventoryExistsInLocalStorage) {
      setInventory(inventoryExistsInLocalStorage);
    } else {
      const getInitialStateStock = async () => {
        const response = await axiosApi.get("/getInitialStateInventory");
        setInventory(response.data);
        localStorage.setItem(
          "@NextE-commerce:inventory",
          JSON.stringify(response.data)
        );
        console.log(response.data);
      };
      getInitialStateStock();
    }
  }, []);

  const title = "inventory";
  const description = "Description inventory";

  return (
    <>
      <SEO
        title={title}
        description={description}
        image="./bg/Getting-Started-with-NextJS.jpg"
      />
      <WithSubnavigation />
      <Box pt="80px" color="gray.300">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Inventory
              </Heading>

              {/* <InventoryModalCreate /> */}
            </Flex>
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>specifications</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inventory.map((inventory) => {
                    return (
                      <Tr key={inventory.id}>
                        <Td>
                          <Text fontWeight="bold">{inventory.name}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{inventory.specifications}</Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
