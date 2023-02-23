import { getNotices } from "@/api/notices";
import { deleteNotice } from "@/api/notices/[noticeId]";
import noticesKeys from "@/queryKeys/noticesKeys";
import { NoticeList } from "@/types/data/notice";
import { Flex, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Follow from "./Follow";
import Like from "./Like";
import Reply from "./Reply";
import ReReply from "./ReReply";

type NoticeData = {
  noticeList: NoticeList;
};

export default function Alert() {
  const queryClient = useQueryClient();

  const alertQuery = useQuery({
    queryKey: noticesKeys.notices,
    queryFn: getNotices
  });

  const remove = useMutation({
    mutationFn: deleteNotice,
    onMutate: async targetId => {
      await queryClient.cancelQueries({ queryKey: noticesKeys.notices });
      const prevNotices = queryClient.getQueryData(noticesKeys.notices);
      queryClient.setQueryData(
        noticesKeys.notices,
        (old: NoticeData | undefined) => {
          return {
            noticeList: old?.noticeList.filter(
              notice => notice.noticeId !== targetId
            ) as NoticeList
          };
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
    <VStack spacing="30px">
      {alertQuery.data?.noticeList.map(alert => (
        <Flex
          key={alert.noticeId}
          w="full"
          onClick={() => {
            remove.mutate(alert.noticeId);
          }}
          fontSize="sm"
        >
          {alert.noticeType === "FOLLOW" && <Follow {...alert} />}
          {alert.noticeType === "LIKE" && <Like {...alert} />}
          {alert.noticeType === "REPLY" && <Reply {...alert} />}
          {alert.noticeType === "REREPLY" && <ReReply {...alert} />}
        </Flex>
      ))}
    </VStack>
  );
}
