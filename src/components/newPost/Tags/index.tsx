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

  return (
    <Flex bg="white" w="full" px="32px" py="16px" gap="12px" flexWrap="wrap">
      {tags.map(t => (
        <Button
          key={t.id}
          rightIcon={
            <Icon
              as={FontAwesomeIcon}
              icon={faX}
              color="gray.400"
              size="xs"
              onClick={() => onRemoveTag(t.id)}
            />
          }
        >
          {t.content}
        </Button>
      ))}

      <InputGroup
        flex={{ sm: "none", md: "1" }}
        border="transparent"
        w={{ sm: "full", md: "inherit" }}
      >
        <InputLeftAddon bg="white" pr="0" pl={{ sm: "0", md: "inherit" }}>
          <Icon as={FontAwesomeIcon} icon={faHashtag} color="gray.400" />
        </InputLeftAddon>
        <Input
          placeholder="태그 추가"
          border="none"
          focusBorderColor="transparent"
          outline="none"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              if (value.length > 100) {
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
                onAddTag(value);
                setValue("");
              }
            }
          }}
        />
      </InputGroup>
    </Flex>
  );
}
