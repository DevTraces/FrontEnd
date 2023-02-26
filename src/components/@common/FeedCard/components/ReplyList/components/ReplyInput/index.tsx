import { getUserProfile } from "@/api/users/profile/[nickname]";
import userAtom from "@/atoms/userAtom";
import ProfileAvatar from "@/components/@common/ProfileAvatar";
import usersKeys from "@/queryKeys/usersKeys";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps, forwardRef, MouseEventHandler } from "react";
import { useRecoilValue } from "recoil";

type ReplyInputProps = {
  feedId: number;
  isInvalid: boolean;
  onSendClick: MouseEventHandler<HTMLDivElement>;
  errorMessage: string;
} & ComponentProps<typeof Input>;

export default forwardRef<HTMLInputElement, ReplyInputProps>(
  ({ isInvalid, feedId, onSendClick, errorMessage, ...restProps }, ref) => {
    const user = useRecoilValue(userAtom);

    const profileQuery = useQuery({
      queryKey: usersKeys.userProfile(user.nickname),
      queryFn: () => getUserProfile(user.nickname)
    });

    return (
      <>
        <InputGroup size="lg">
          <InputLeftElement>
            <ProfileAvatar
              src={profileQuery.data?.profileImageUrl}
              size="28px"
              alt="프로필 이미지"
            />
          </InputLeftElement>
          <Input
            variant="filled"
            bg="white"
            focusBorderColor="white"
            placeholder="댓글 달기..."
            _hover={{ bg: "none" }}
            ref={ref}
            {...restProps}
          />
          <InputRightElement onClick={onSendClick}>
            <Icon
              as={FontAwesomeIcon}
              icon={faPaperPlane}
              color={isInvalid ? "gray.300" : "primary"}
            />
          </InputRightElement>
        </InputGroup>
        {errorMessage}
      </>
    );
  }
);
