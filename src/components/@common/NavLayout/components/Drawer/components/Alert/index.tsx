import { getNotices } from "@/api/notices";
import { deleteNotice } from "@/api/notices/[noticeId]";
import noticesKeys from "@/queryKeys/noticesKeys";
import { NoticeList } from "@/types/data/notice";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Follow from "./Follow";
import Like from "./Like";
import Reply from "./Reply";
import ReReply from "./ReReply";

export default function Alert() {
  const queryClient = useQueryClient();

  const alertQuery = useQuery({
    queryKey: noticesKeys.notices,
    queryFn: () => getNotices(0)
  });

  const removeMutation = useMutation({
    mutationFn: deleteNotice,
    onMutate: async targetId => {
      await queryClient.cancelQueries({ queryKey: noticesKeys.notices });
      const prevNotices = queryClient.getQueryData(noticesKeys.notices);
      queryClient.setQueryData(
        noticesKeys.notices,
        (old: NoticeList | undefined) => {
          return old?.filter(notice => notice.noticeId !== targetId);
        }
      );

      return { prevNotices };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(noticesKeys.notices, context?.prevNotices);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: noticesKeys.notices
      });
    }
  });

  return (
    <Flex direction="column" gap="30px">
      {alertQuery.data?.length === 0 ? (
        <Flex alignItems="center" gap="20px">
          <Icon as={FontAwesomeIcon} icon={faCheck} />
          <Text fontSize="lg">현재 온 알림이 없어요</Text>
        </Flex>
      ) : (
        alertQuery.data?.map(alert => (
          <HStack key={alert.noticeId} w="full" fontSize="sm">
            {alert.noticeType === "FOLLOW" && <Follow {...alert} />}
            {alert.noticeType === "LIKE" && <Like {...alert} />}
            {alert.noticeType === "REPLY" && <Reply {...alert} />}
            {alert.noticeType === "REREPLY" && <ReReply {...alert} />}

            <Icon
              as={FontAwesomeIcon}
              icon={faTrash}
              cursor="pointer"
              color="gray"
              onClick={() => {
                removeMutation.mutate(alert.noticeId);
              }}
            />
          </HStack>
        ))
      )}
    </Flex>
  );
}
