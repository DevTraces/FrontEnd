import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  Text
} from "@chakra-ui/react";
import { faHashtag, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type TagItem = { id: string; content: string };

type TagsProps = {
  tags: TagItem[];
  onAddTag: (content: TagItem["content"]) => Promise<void>;
  onRemoveTag: (id: TagItem["id"]) => void;
};

export default function Tags({ tags, onAddTag, onRemoveTag }: TagsProps) {
  const [value, setValue] = useState("");
  const toast = useToast();
  const [errorMsg, setErrorMsg] = useState("");

  const addTag = (content: string) => {
    if (tags.length >= 10) {
      toast({
        title: "태그는 최대 10개만 가능해요",
        status: "warning",
        duration: 1000
      });
    } else {
      onAddTag(content)
        .then(() => {
          setErrorMsg("");
        })
        .catch((err: Error) => {
          setErrorMsg(err.message);
        });
      setValue("");
    }
  };

  return (
    <>
      <Text
        color="orange.400"
        bg="white"
        textAlign="left"
        w="full"
        h="40px"
        px="32px"
        py="16px"
      >
        {errorMsg}
      </Text>
      <Flex bg="white" w="full" px="32px" py="16px" gap="12px" flexWrap="wrap">
        {tags.map(t => (
          <Button
            key={t.id}
            onClick={() => onRemoveTag(t.id)}
            rightIcon={
              <Icon
                as={FontAwesomeIcon}
                icon={faX}
                color="gray.400"
                size="xs"
              />
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
            flex={{ base: "none", md: "1" }}
            border="transparent"
            w={{ base: "full", md: "inherit" }}
          >
            <InputLeftAddon bg="white" pr="0" pl={{ base: "0", md: "inherit" }}>
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
    </>
  );
}
