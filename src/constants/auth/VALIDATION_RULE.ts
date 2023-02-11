import { RegisterOptions } from "react-hook-form";

type PossibleKeys = "email" | "authKey" | "nickname" | "username" | "password";

const VALIDATION_RULE: { [key in PossibleKeys]: RegisterOptions } = {
  email: {
    required: "이메일을 입력해야해요",
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
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
      value: /^[a-zA-Z0-9]*$/,
      message: "영어와 숫자만 사용할 수 있어요"
    }
  },
  username: {
    required: "이름이 필요해요"
  },
  password: {
    required: "비밀번호가 필요해요"
  }
};

export default VALIDATION_RULE;