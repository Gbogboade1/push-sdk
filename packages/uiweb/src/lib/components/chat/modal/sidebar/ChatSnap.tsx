import { IFeeds } from '@pushprotocol/restapi';
import moment from 'moment';
import { ChatMainStateContext, ChatPropsContext } from '../../../../context';
import { dateToFromNowDaily } from '../../../../helpers';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Section, Span } from '../../../reusables/sharedStyling';
import { UnreadChats } from '../../MinimisedModalHeader';
import { pCAIP10ToWallet } from '../../../../helpers';
import { ethers } from 'ethers';
import { useResolveWeb3Name } from '../../../../hooks';

type SectionStyleProps = {
  flexDirection?: string;
  gap?: string;
  alignItems?: string;
};

type ChatSnapPropType = {
  chat: IFeeds;
  id: string;
};

const shortenUsername = (username: string) => {
  if (username?.length > 20) return username.substring(0, 20) + '...';
  else return username;
};

//fix messageType type
const Message = ({
  messageContent,
  messageType,
}: {
  messageContent: string;
  messageType: string;
}) => {
  return messageType === 'Text' ? (
    <Span textAlign="left" fontWeight="400" fontSize="16px" color="#62626A">
      {messageContent?.length > 25
        ? messageContent?.slice(0, 25) + '...'
        : messageContent}
    </Span>
  ) : messageType === 'Image' ? (
    <Span textAlign="left" fontWeight="400" fontSize="16px" color="#62626A">
      <i className="fa fa-picture-o" aria-hidden="true"></i> Image
    </Span>
  ) : messageType === 'File' ? (
    <Span textAlign="left" fontWeight="400" fontSize="16px" color="#62626A">
      <i className="fa fa-file" aria-hidden="true"></i> File
    </Span>
  ) : messageType === 'GIF' || messageType === 'MediaEmbed' ? (
    <Span textAlign="left" fontWeight="400" fontSize="16px" color="#62626A">
      <i className="fa fa-picture-o" aria-hidden="true"></i> Media
    </Span>
  ) : null;
};

//Resolve ud name and  pfp
export const ChatSnap: React.FC<ChatSnapPropType> = ({ chat, id }) => {
  const { setSelectedChatId, web3NameList } =
    useContext<any>(ChatMainStateContext);
  const { env } = useContext<any>(ChatPropsContext);

  useResolveWeb3Name(chat?.did, env);
  const walletLowercase = pCAIP10ToWallet(chat?.did)?.toLowerCase();
  const checksumWallet = walletLowercase
    ? ethers.utils.getAddress(walletLowercase)
    : null;
  const web3Name = checksumWallet ? web3NameList[checksumWallet] : null;

  return (
    <Container
      justifyContent="space-between"
      padding="15px 15px"
      onClick={() => setSelectedChatId(id)}
    >
      <Section gap="18px">
        <Image src={chat.profilePicture!} alt="profile picture" />
        <Section flexDirection="column" gap="8px" alignItems="start">
          <Span fontWeight="700" fontSize="16px" color="#000">
            {web3Name ?? shortenUsername(chat?.did?.split(':')[1])}
          </Span>
          <Message
            messageContent={chat?.msg?.messageContent}
            messageType={chat?.msg?.messageType}
          />
        </Section>
      </Section>
      <Section flexDirection="column" alignItems="end" gap="8px">
        <Span fontWeight="400" fontSize="12px" color="#62626A">
          {dateToFromNowDaily(chat?.msg?.timestamp as number)}
        </Span>
        <UnreadChats numberOfUnreadMessages="3" />
      </Section>
    </Container>
  );
};

//styles
const Container = styled(Section)`
  border-bottom: 1px dashed #ededee;
  cursor: pointer;
  &:hover {
    background: #f4f5fa;
  }
`;

const Image = styled.img`
  border-radius: 100%;
  width: 36px;
  height: 36px;
`;
