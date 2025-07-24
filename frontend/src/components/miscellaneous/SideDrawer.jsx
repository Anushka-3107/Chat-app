// import { Box, Button, Tooltip } from "@chakra-ui/react";
// // import { useState } from "react"
// import { FaSearch } from "react-icons/fa";

// const SideDrawer = () => {
//   // const [search, setSearch] = useState("");
//   // const [searchResult, setSearchResult] = useState([]);
//   // const [loading, setLoading] = useState(false)
//   // const [loadingChat,setLoadingChat] = useState();

//   return (
//     <Box>
//       <Tooltip label="This is the tooltip content" hasArrow placement="bottom-end">
//   <Button variant="outline" size="sm">
//     <FaSearch />
//   </Button>
// </Tooltip>

//     </Box>
//   );
// };

// export default SideDrawer;

import { Box, Button, Text , Menu, Portal } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";
import { CiBellOn } from "react-icons/ci";

const SideDrawer = () => {
  return (
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="2px"
    >
      <Tooltip
        content="search users to chat"
        hasArrow
        positioning={{ placement: "bottom-end" }}
      >
        <Button>
          <FaSearch />
          <Text textStyle="sm" display={{base:"none", md:"flex"}} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work Sans" color="blackAlpha.900">
      Chat-tea-ing
      </Text>

      <div>
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" p={1}>
         <CiBellOn />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt">New Text File</Menu.Item>
            <Menu.Item value="new-file">New File...</Menu.Item>
            <Menu.Item value="new-win">New Window</Menu.Item>
            <Menu.Item value="open-file">Open File...</Menu.Item>
            <Menu.Item value="export">Export</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
      </div>

    </Box>
  );
};

export default SideDrawer;
