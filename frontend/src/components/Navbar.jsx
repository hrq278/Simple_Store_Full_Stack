import { Flex, Container, Text, HStack , Button } from "@chakra-ui/react"
import { Link } from "react-router"
import { PlusSquareIcon } from "@chakra-ui/icons" 
import { useColorMode } from "@chakra-ui/react"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

function Navbar(){

    const {colorMode, toggleColorMode} = useColorMode()


    return(
        
        <Container maxW={"1140pc"} px={4}   >
            <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base : "column",
                sm:"row"
              }}    
            >
            <Text
            bgGradient='linear(to-l,rgb(0, 166, 255),rgb(59, 89, 255))'
            bgClip={"text"}
            fontSize={{base:"22", sm:"28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            >
            <Link to={"/"}> Product Store 🛒 </Link>

            </Text>

            <HStack 
            spacing={2}
            alignItems={"center"}>
              <Link to={"/create"} > 
              <Button>
                <PlusSquareIcon  fontSize={20}/>
              </Button>
              </Link>


              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon size="20" /> : <LuSun size="20" /> }
              </Button>
            </HStack>
            </Flex>
        </Container> 
    )
}
export default Navbar