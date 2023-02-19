import { useContext } from "react";
import { NavTypeContext } from "../../NavTypeContext";
import InputContainer from "./components/InputContainer";
import SearchTab from "./SearchTab";

export default function Search() {
  const type = useContext(NavTypeContext);

  return (
    <>
      {type === "sidebar" && <InputContainer mb="20px" />}
      <SearchTab />
    </>
  );
}
