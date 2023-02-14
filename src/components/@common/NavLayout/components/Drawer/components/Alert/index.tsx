import { getNotices } from "@/api/notices";
import { deleteNotice } from "@/api/notices/[noticeId]";
import { Flex, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Follow from "./Follow";
import Like from "./Like";
import Reply from "./Reply";
import ReReply from "./ReReply";

export default function Alert() {
  const alertQuery = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices
  });

  const remove = useMutation({
    mutationFn: deleteNotice
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
