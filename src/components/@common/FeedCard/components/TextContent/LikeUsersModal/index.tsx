import { getFeedsLikeUsers } from "@/api/feeds/like/[feedId]";
import feedAtom from "@/atoms/feedAtom";
import ProfileAvatar from "@/components/@common/ProfileAvatar";
import useFollow from "@/hooks/useFollow";
import feedsKeys from "@/queryKeys/feedsKeys";
import currentUser from "@/utils/currentUser";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

type LikeUsersModalProps = {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
};

export default function LikeUsersModal({
  disclosure: { isOpen, onClose }
}: LikeUsersModalProps) {
  const { feedId } = useRecoilValue(feedAtom);

  const router = useRouter();
  const { data } = useQuery({
    queryKey: feedsKeys.likeUsers(feedId),
    queryFn: () => getFeedsLikeUsers({ feedId, page: 0 })
  });

  const { toggleMutation } = useFollow();

  const toggleFollow = (isFollowing: boolean, nickname: string) => {
    toggleMutation(isFollowing).mutate({ nickname });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent h="440px">
        <ModalCloseButton top="16px" />
        <ModalHeader textAlign="center" borderBottom="0.5px solid gray">
          <Text>좋아요</Text>
        </ModalHeader>
        <ModalBody py="20px" px="24px">
          {data ? (
            <Flex direction="column" gap="24px">
              {data.map(
                ({ username, nickname, profileImageUrl, following }) => (
                  <Flex
                    key={nickname}
                    alignItems="center"
                    gap="20px"
                    w="full"
                    cursor="pointer"
                  >
                    <Flex
                      alignItems="center"
                      gap="20px"
                      flex="1"
                      onClick={() => {
                        router.push(`/user/${nickname}/posts`);
                      }}
                    >
                      <ProfileAvatar
                        src={profileImageUrl}
                        size="44px"
                        alt="프로필 이미지"
                      />
                      <VStack spacing="0" alignItems="start" w="200px">
                        <Text fontWeight="bold" noOfLines={1}>
                          {nickname}
                        </Text>
                        <Text color="gray" noOfLines={1}>
                          {username}
                        </Text>
                      </VStack>
                    </Flex>
                    {currentUser.getNickname() !== nickname && (
                      <Button
                        w="100px"
                        colorScheme={following ? "red" : "blue"}
                        variant={following ? "outline" : "solid"}
                        onClick={() => toggleFollow(following, nickname)}
                      >
                        {following ? "팔로잉" : "팔로우"}
                      </Button>
                    )}
                  </Flex>
                )
              )}
            </Flex>
          ) : (
            <Spinner />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
