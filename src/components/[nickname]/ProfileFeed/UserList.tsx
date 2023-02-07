import { VStack } from "@chakra-ui/react";
import UserItem from "./UserItem";

export default function UserList() {
  return (
    <VStack>
      <UserItem isFollowing={false} username="유저이름" nickname="닉네임" />
      <UserItem isFollowing username="유저이름" nickname="닉네임" />
      <UserItem isFollowing={false} username="유저이름" nickname="닉네임" />
    </VStack>
  );
}
