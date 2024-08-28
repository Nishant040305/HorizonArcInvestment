import React, { useState,useEffect } from 'react';
import './MessageBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setpresentChat } from '../../../Store/MessageSlice';
import { socket } from '../../../Lib/socket';
import { updateSeenStatus } from '../../../Store/MessageSlice';
const MessageBlock = (props) => {
    const dispatch = useDispatch();

    const ChangeRoom = (chatRoomId) => {
        // Set the current chat room in the Redux state
        dispatch(setpresentChat(chatRoomId));

        // Emit the markAsSeen event to the server
        socket.emit('markAsSeen', {
            chatRoomId: chatRoomId,
            userId: props.userId,
        });
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className='Message-block' onClick={() => ChangeRoom(props.chatRoomId)}>
            <img className="rounded-full w-10 h-10" src={props.image} alt={props.name} />
            <div className='flex justify-between w-full'>
                <div className={`Message-Block-name ${props.unseenCount > 0 ? 'bold_name' : ''}`}>
                    {props.name}
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='Message-block-timestamp'>
                    <small>{formatTime(props.timestamp)}</small>
                </div>
                {props.unseenCount > 0 && (
                    <div className='unseen-count'>
                        {props.unseenCount}
                    </div>
                )}
            </div>
        </div>
    )
}

const MessageBar = () => {
    const user = useSelector(state => state.user);
    const chatRoom = useSelector(state => state.message);
    const chatUser = chatRoom.chatRoom;
    const chatMessage = chatRoom.message;
    const [searchText, setSearchText] = useState('');
    const presentChat = chatRoom.presentChat;
    const globaluser = useSelector(state=>state.globalUsers.Users);
    useEffect(() => {
        if (presentChat) {
            socket.emit('markAsSeen', {
                chatRoomId: presentChat._id,
                userId: user._id,
            });
        }
    }, [presentChat, user._id,presentChat._id!=0?chatMessage[presentChat._id]:0]);

    const sortedChatUsers = chatUser.slice().sort((a, b) => {
        const otherUsernameA = user._id === a.users[0] ? globaluser[a.users[1]].Username : globaluser[a.users[0]].Username;
        const otherUsernameB = user._id === b.users[0] ? globaluser[b.users[1]].Username : globaluser[b.users[0]].Username;
        const isMatchA = otherUsernameA.toLowerCase().includes(searchText.toLowerCase());
        const isMatchB = otherUsernameB.toLowerCase().includes(searchText.toLowerCase());
        const lastMessageA = chatMessage[a._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];
        const lastMessageB = chatMessage[b._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];
        const timestampA = lastMessageA ? new Date(lastMessageA.createdAt).getTime() : 0;
        const timestampB = lastMessageB ? new Date(lastMessageB.createdAt).getTime() : 0;
        if (isMatchA && !isMatchB) return -1;
        if (!isMatchA && isMatchB) return 1;
        return timestampB - timestampA;
    });

    return (
        <>
            {chatUser.length !== 0 ? (
                <div className='Message-bar p25'>
                    <div style={{ fontSize: 28, textAlign: 'left', paddingLeft: 20, fontWeight: 600, paddingBottom: 20 }}>Messages</div>
                    <input 
                        className='message-user-search' 
                        placeholder='Search...' 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)} 
                    />
                    <div className='Message-bar'>
                        {sortedChatUsers.map((info, index) => {
                            const lastMessage = chatMessage[info._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];
                            const lastMessageTimestamp = lastMessage?.createdAt || Date.now();
                            const unseenCount = chatMessage[info._id]?.filter(msg => !msg.isSeen.includes(user._id)).length || 0;

                            return (
                                <MessageBlock 
                                    key={info?._id || index} 
                                    chatRoomId={info?._id}
                                    image={info?.ChatIcon === 'NULL' 
                                        ? (user._id === info.users[0] ? globaluser[info.users[1]].image : globaluser[info.users[0]].image) 
                                        : info.ChatIcon}
                                    name={info?.ChatIcon === 'NULL' 
                                        ? (user._id === info.users[0] ? globaluser[info.users[1]].Username : globaluser[info.users[0]].Username) 
                                        : info.ChatIcon}
                                    timestamp={lastMessageTimestamp}
                                    unseenCount={unseenCount}
                                    userId={user._id}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : <></>}
        </>
    )
}

export default MessageBar;
