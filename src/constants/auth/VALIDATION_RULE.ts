import { RegisterOptions } from "react-hook-form";

type PossibleKeys =
  | "email"
  | "authKey"
  | "nickname"
  | "username"
  | "password"
  | "description"
  | "replyContent";

const VALIDATION_RULE: { [key in PossibleKeys]: RegisterOptions } = {
  email: {
    required: "이메일을 입력해야해요",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "이메일 형식을 지켜주세요"
    }
  },
  authKey: {
    required: "인증코드를 입력해야해요",
    minLength: { value: 6, message: "6자리 숫자를 입력해야해요" },
    pattern: { value: /^\d{6}$/, message: "6자리 숫자를 입력해야해요" }
  },
  nickname: {
    required: "닉네임이 필요해요",
    pattern: {
      value: /^[a-zA-Z0-9._]{1,30}$/,
      message: "30자 이하의 영어 숫자 . _ 만 가능해요"
    }
  },
  username: {
    required: "이름이 필요해요",
    pattern: {
      value: /^.{1,30}$/,
      message: "30자 이하로만 가능해요"
    }
  },
  password: {
    required: "비밀번호가 필요해요",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "8자리 이상, 알파벳 1개 이상, 숫자 1개 이상이 포함되어야 해요"
    }
  },
  description: {
    maxLength: {
      value: 150,
      message: "150자 이하로만 가능해요"
    }
  },
  replyContent: {
    required: true,
    maxLength: {
      value: 1000,
      message: "1000자 이하로만 가능해요"
    }
  }
};

export default VALIDATION_RULE;
