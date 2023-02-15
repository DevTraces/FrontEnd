import { getNotices } from "@/api/notices";
import { deleteNotice } from "@/api/notices/[noticeId]";
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
    queryKey: ["notices"],
    queryFn: getNotices
  });

  const remove = useMutation({
    mutationFn: deleteNotice,
    onMutate: async targetId => {
      await queryClient.cancelQueries({ queryKey: ["notices"] });
      const prevNotices = queryClient.getQueryData(["notices"]);
      queryClient.setQueryData(["notices"], (old: NoticeData | undefined) => {
        return {
          noticeList: old?.noticeList.filter(
            notice => notice.noticeId !== targetId
          ) as NoticeList
        };
      });

      return { prevNotices };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["notices"], context?.prevNotices);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"]
      });
    }
  });

  if (alertQuery.isLoading) return <>알림 로딩중</>;
  if (alertQuery.isError) return <>알림 에러</>;

  return (
    <VStack spacing="30px">
      {alertQuery.data.noticeList.map(alert => (
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
