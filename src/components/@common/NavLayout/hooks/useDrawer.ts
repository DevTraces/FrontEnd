import { atom, useRecoilState } from "recoil";

const drawerAtom = atom({
  key: "drawerAtom",
  default: false
});

export default function useDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(drawerAtom);

  return {
    isOpen,
    onToggle: () => setIsOpen(prev => !prev),
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false)
  };
}
