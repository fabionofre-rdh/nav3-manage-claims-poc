import ChatContainer from "./components/ChatContainer";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import type { MessageListProps } from "./components/MessageList";
import type { ChatContainerProps } from "./components/ChatContainer";
import type { ChatInputProps } from "./components/ChatInput";
import type { ReactNode, Ref } from "react";
import type { ScrollBarRef } from "./types";
import { ScrollBar } from "../ui";

export type MessageList = MessageListProps["list"];

export type ChatBoxProps = {
  messageList: MessageList;
  header?: ChatContainerProps["header"];
  showMessageList?: boolean;
  children?: ReactNode;
  containerClass?: string;
  ref?: Ref<ScrollBarRef>;
} & Omit<MessageListProps, "list"> &
  ChatInputProps;

const ChatBox = (props: ChatBoxProps) => {
  const {
    messageList,
    showMessageList = true,
    children,
    header,
    placeholder,
    onInputChange,
    showAvatar,
    avatarGap,
    customRenderer,
    customAction,
    bubbleClass,
    typing,
    messageListClass,
    containerClass,
    ref,
  } = props;

  return (
    <ChatContainer
      className={containerClass}
      header={header}
      input={
        <div className="py-4">
          <ChatInput placeholder={placeholder} onInputChange={onInputChange} />
        </div>
      }
    >
      {showMessageList && (
        <ScrollBar
          autoHide={true}
          scrollableNodeProps={{ ref }}
          className="py-4 flex-1 flex h-full flex-col overflow-y-auto overflow-x-hidden"
        >
          <MessageList
            // ref={ref}
            list={messageList}
            showAvatar={showAvatar}
            avatarGap={avatarGap}
            customRenderer={customRenderer}
            customAction={customAction}
            typing={typing}
            messageListClass={messageListClass}
            bubbleClass={bubbleClass}
          />
        </ScrollBar>
      )}
      {children}
    </ChatContainer>
  );
};

export default ChatBox;
