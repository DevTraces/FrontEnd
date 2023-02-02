import {
  Box,
  Center,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { faArrowRight, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const alerts = [
  {
    id: "1231bb3123",
    type: "follow",
    nickname: "john134"
  },
  {
    id: "fbq33",
    type: "like",
    nickname: "PeterMeter",
    postTitle: "집에 잘 들어가는 방법"
  }
];

export default function Alert() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const popupRef = useRef(null);
  useOutsideClick({
    ref: popupRef,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="topBarAlert"]')) {
        onToggle();
        return;
      }
      onClose();
    }
  });
  return (
    <Popover closeOnBlur={false} isOpen={isOpen}>
      <PopoverTrigger>
        <Center boxSize="40px" px="10px" data-type="topBarAlert">
          <Icon
            onClick={onOpen}
            as={FontAwesomeIcon}
            icon={faBell}
            color="black"
          />
        </Center>
      </PopoverTrigger>
      <PopoverContent ref={popupRef}>
        <PopoverBody>
          <Flex direction="column" gap="10px">
            알림
            <Flex direction="column" gap="20px">
              {alerts.map(alert => {
                return (
                  <Flex
                    key={alert.id}
                    alignItems="center"
                    justifyContent="space-between"
                    gap="5px"
                    h="50px"
                  >
                    {alert.type === "follow" && (
                      <>
                        <Box boxSize={10} borderRadius="50%" bg="gray" />
                        <Flex direction="column" flex={1}>
                          <Text fontWeight="bold">팔로우 요청</Text>

                          <Text>{alert.nickname}</Text>
                        </Flex>
                        <Icon
                          as={FontAwesomeIcon}
                          icon={faArrowRight}
                          color="gray.300"
                        />
                      </>
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
