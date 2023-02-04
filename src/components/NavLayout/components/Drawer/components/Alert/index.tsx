import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const alerts = [
  {
    id: "1231bb3123",
    type: "follow",
    nickname: "john134"
  }
];
export default function Alert() {
  return (
    <Flex direction="column" gap="10px">
      <Flex direction="column" gap="20px">
        {alerts.map(alert => {
          return (
            <Flex
              key={alert.id}
              alignItems="center"
              justifyContent="space-between"
              gap="12px"
              h="50px"
              cursor="pointer"
            >
              {alert.type === "follow" && (
                <>
                  <Box boxSize={10} borderRadius="50%" bg="gray" />
                  <Flex direction="column" flex={1}>
                    <Text fontWeight="bold">팔로우 요청</Text>
                    <Text color="gray">@{alert.nickname}</Text>
                  </Flex>
                  <Icon
                    as={FontAwesomeIcon}
                    icon={faChevronRight}
                    color="gray.400"
                  />
                </>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
