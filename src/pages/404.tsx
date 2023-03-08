import NavLayout from "@/components/@common/NavLayout";
import useClient from "@/hooks/useClient";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Text
} from "@chakra-ui/react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NotFoundPageImg from "public/404.svg";

const shuffle = (arr: string[]) => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[randomPosition];
    result[randomPosition] = temp;
  }
  return result;
};
export default function NotFoundPage() {
  const isClient = useClient();

  const developers = shuffle([
    "codeisneverodd",
    "jiseung-kang",
    "DongvinPark",
    "gwakjaeha",
    "heyazoo1007"
  ]);

  if (!isClient) return null;
  return (
    <NavLayout>
      <Center
        pos="relative"
        alignItems="center"
        w="full"
        flexDirection="column"
        pt="200px"
      >
        <Flex
          direction="column"
          pt={20}
          gap="40px"
          m="auto"
          mb={20}
          textAlign="center"
        >
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Image src={NotFoundPageImg} alt="이미지" width={300} />
          </motion.div>
          <Text fontWeight="bold" fontSize="xl">
            사용할 수 없는 페이지에요.
          </Text>
          <Link href="/feed">
            <Button fontWeight="bold" size="lg" colorScheme="purple">
              메인으로 돌아가기
            </Button>
          </Link>
          <Divider />
          <Flex
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            direction="column"
          >
            <Box>
              <Text fontSize="2xl">아래 개발자 중 한 명을 잡아보세요!</Text>
            </Box>
            <motion.div
              initial={{ x: -500 }}
              animate={{ x: 500 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.3
              }}
            >
              <Flex gap="40px" mt="40px">
                {developers.map(d => (
                  <Link href={`https://github.com/${d}`} target="_blank">
                    <Button
                      colorScheme="facebook"
                      leftIcon={<Icon as={FontAwesomeIcon} icon={faCat} />}
                    >
                      {d}
                    </Button>
                  </Link>
                ))}
              </Flex>
            </motion.div>
          </Flex>
        </Flex>
      </Center>
    </NavLayout>
  );
}
