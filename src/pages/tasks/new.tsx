import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

export default function NewPage() {
  return (
    <>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.900"
      >
        <Box
          backgroundColor="gray.700"
          color="white"
          minW="560px"
          mx="auto"
          p="10"
          rounded="md"
        >
          <form>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                color="black"
                background="#fff"
                type="text"
                name="title"
                placeholder="Write your title."
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                color="black"
                background="#fff"
                name="description"
                placeholder="Write your description."
              />
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}
