import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import { axiosApi } from "../../services/axiosApi";
import { SEO } from "../../components/SEO";
import dynamic from "next/dynamic";
import { CustomerModalCreate } from "../../components/Modal/Customer/Create";

const WithSubnavigation = dynamic(import("../../components/NavBar"), {
  ssr: false,
});

export default function Customer() {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    const customerExistsInLocalStorage = JSON.parse(
      localStorage.getItem("@NextE-commerce:customer")
    );
    if (customerExistsInLocalStorage) {
      setCustomer(customerExistsInLocalStorage);
    } else {
      const getInitialStateStock = async () => {
        const response = await axiosApi.get("/getInitialStateCustomers");
        setCustomer(response.data);
        localStorage.setItem(
          "@NextE-commerce:customer",
          JSON.stringify(response.data)
        );
        console.log(response.data);
      };
      getInitialStateStock();
    }
  }, []);

  const title = "Customer";
  const description = "Description Customer";

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
                Customers
              </Heading>

              <CustomerModalCreate/>
            </Flex>
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Customer</Th>
                    <Th>e-mail</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customer.map((customer) => {
                    return (
                      <Tr key={customer.id}>
                        <Td>
                          <Text fontWeight="bold">{customer.fullName}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{customer.email}</Text>
                        </Td>
                        <Td>
                          
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
