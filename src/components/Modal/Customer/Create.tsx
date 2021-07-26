import axios from "axios";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Icon,
  Flex,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../Form/Input";

type CreateUserFormData = {
  fullName: string;
  email: string;
  street: string;
  number: string;
};

const createUserFormSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().required("E-mail is required").email("E-mail is invalid"),
  street: yup.string().required("Street is required"),
  number: yup.number().required("Number is required"),
});

export function CustomerModalCreate(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateCustomer: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    setIsLoading(true);
    const { email } = values;
    const getAllCustomer = JSON.parse(
      localStorage.getItem("@NextE-commerce:customer")
    );
    const customerExists = getAllCustomer.filter(
      ({ email }) => email === values.email
    );
    if (customerExists.length > 0) {
      toast({
        title: "Subscription",
        description: `Customer to email: ${email} already exists`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const sendNewCustomer = await axios.post(`./api/handleCreateCustomer`, {
      values,
    });
    const { error, message, newCustomer } = sendNewCustomer.data;

    if (error) {
      toast({
        title: "Subscription",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Subscription",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
    const { id, fullName, savedEmail, street, number } = newCustomer;
    getAllCustomer.push({
      id,
      fullName,
      email: savedEmail,
      street,
      number,
    });
    localStorage.setItem(
      "@NextE-commerce:customer",
      JSON.stringify(getAllCustomer)
    );
    setIsLoading(false);
    onClose();
    router.push("/");
  };

  return (
    <>
      <Button
        as="a"
        onClick={onOpen}
        colorScheme="pink"
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
      >
        New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"5xl"}>
        <ModalOverlay />
        <ModalContent
          backgroundSize={"cover"}
          backgroundPosition={"top center"}
          borderWidth="2px"
          borderColor="gray.400"
          borderRadius="sm"
          bg="gray.800"
        >
          <ModalHeader color={"gray.200"}>Create Customer</ModalHeader>
          <ModalCloseButton color={"gray.200"} />
          <ModalBody color={"gray.200"}>
            <Box color="gray.100">
              <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Box
                  as="form"
                  flex="1"
                  borderRadius={8}
                  bg="gray.800"
                  p={["6", "8"]}
                  onSubmit={handleSubmit(handleCreateCustomer)}
                >
                  <VStack spacing="8">
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        name="fullName"
                        label="Full Name"
                        error={errors.fullName}
                        {...register("fullName")}
                      />
                      <Input
                        name="email"
                        type="email"
                        label="E-mail"
                        error={errors.email}
                        {...register("email")}
                      />
                    </SimpleGrid>

                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        name="street"
                        label="Street"
                        error={errors.street}
                        {...register("street")}
                      />
                      <Input
                        name="number"
                        label="Number"
                        type="number"
                        error={errors.number}
                        {...register("number")}
                      />
                    </SimpleGrid>
                  </VStack>

                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Button onClick={onClose} color={"gray.600"}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="pink"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter color={"gray.200"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
