import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const db_user = localStorage.getItem("cad_user")
      ? JSON.parse(localStorage.getItem("cad_user"))
      : [];
    setData(db_user);
  }, [setData]);

  const handleRemove = (username) => {
    const newArray = data.filter((item) => item.username !== username);
    setData(newArray);
    localStorage.setItem("cad_user", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Register
        </Button>
        <Box overflow="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Name
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Age
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Username
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, age, username }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{age}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{username}</Td>
                  <Td>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, age, username, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(username)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
