import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast
} from "@chakra-ui/react";
import { faHashtag, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type TagItem = { id: string; content: string };

type TagsProps = {
  tags: TagItem[];
  onAddTag: (content: TagItem["content"]) => void;
  onRemoveTag: (id: TagItem["id"]) => void;
};

export default function Tags({ tags, onAddTag, onRemoveTag }: TagsProps) {
  const [value, setValue] = useState("");
  const toast = useToast();

  const addTag = (content: string) => {
    if (content.length > 100) {
      toast({
        title: "태그는 100자 이하만 가능해요",
        status: "warning",
        duration: 1000
      });
    } else if (tags.length >= 10) {
      toast({
        title: "태그는 최대 10개만 가능해요",
        status: "warning",
        duration: 1000
      });
    } else {
      onAddTag(content);
      setValue("");
    }
  };

  return (
    <Flex bg="white" w="full" px="32px" py="16px" gap="12px" flexWrap="wrap">
      {tags.map(t => (
        <Button
          key={t.id}
          onClick={() => onRemoveTag(t.id)}
          rightIcon={
            <Icon as={FontAwesomeIcon} icon={faX} color="gray.400" size="xs" />
          }
        >
          {t.content}
        </Button>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault();
          addTag(value);
        }}
      >
        <InputGroup
          flex={{ sm: "none", md: "1" }}
          border="transparent"
          w={{ sm: "full", md: "inherit" }}
        >
          <InputLeftAddon bg="white" pr="0" pl={{ sm: "0", md: "inherit" }}>
            <Icon as={FontAwesomeIcon} icon={faHashtag} color="gray.400" />
          </InputLeftAddon>
          <Input
            placeholder="태그를 입력 후 엔터"
            border="none"
            focusBorderColor="transparent"
            outline="none"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </InputGroup>
      </form>
    </Flex>
  );
}
