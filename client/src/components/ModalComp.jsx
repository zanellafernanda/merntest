import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [age, setAge] = useState(dataEdit.age || "");
  const [username, setUsername] = useState(dataEdit.username || "");

  const handleSave = () => {
    if (!name || !age || !username) return;

    if (usernameAlreadyExists()) {
      return alert("Username already taken!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, age, username };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, age, username }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_user", JSON.stringify(newDataArray));
    setData(newDataArray);
    onClose();
  };

  const usernameAlreadyExists = () => {
    if (dataEdit.username !== username && data?.length) {
      return data.find((item) => item.username === username);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Users List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <ModalFooter justifyContent="start">
                <Button colorScheme="green" mr={3} onClick={handleSave}>
                  Save
                </Button>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
