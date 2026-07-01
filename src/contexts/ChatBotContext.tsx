import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatBotContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const ChatBotContext = createContext<ChatBotContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const ChatBotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <ChatBotContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = () => useContext(ChatBotContext);
