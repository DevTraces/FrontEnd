import {
  Box,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";
import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopoverIconButton from "../PopoverIconButton";

type MorePopoverProps = {
  onDeleteClick?: () => void;
  onEditClick?: () => void;
};

export default function MorePopover({
  onDeleteClick = () => {},
  onEditClick = () => {}
}: MorePopoverProps) {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose
  } = useDisclosure();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="더보기"
          ml="auto"
          p="8px"
          bg="transparent"
          onClick={onPopoverOpen}
          icon={
            <Icon
              as={FontAwesomeIcon}
              icon={faEllipsis}
              color="black"
              cursor="pointer"
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent width="240px" overflow="hidden">
        <Box bg="green" w="full">
          <PopoverIconButton
            icon={faTrash}
            color="red"
            colorScheme="red"
            onClick={onDeleteClick}
          >
            삭제
          </PopoverIconButton>
          <PopoverIconButton icon={faEdit} onClick={onEditClick}>
            편집
          </PopoverIconButton>
        </Box>
      </PopoverContent>
    </Popover>
  );
}
