import React, { useState } from 'react';
import './MessageBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setpresentChat } from '../../../Store/MessageSlice';

const MessageBlock = (props) => {
    const dispatch = useDispatch();

    const ChangeRoom = (index) => {
        dispatch(setpresentChat(index));
    }

    // Format the timestamp (createdAt) to HH:mm format
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className='Message-block' onClick={() => ChangeRoom(props.data)}>
            <img className="rounded-full w-10 h-10" src={props.image} alt={props.name} />
            <div className='Message-Block-name'>{props.name}</div>
            <div className='flex flex-col'>
                <div className='Message-block-timestamp'>
                    <small>{formatTime(props.timestamp)}</small>
                </div>
            </div>
        </div>
    )
}

const MessageBar = () => {
    const user = useSelector(state => state.user);
    const chatRoom = useSelector(state => state.message);
    const chatUser = chatRoom.chatRoom;
    const chatMessage = chatRoom.message;
    console.log(chatUser)
    const [searchText, setSearchText] = useState('');

    // Filter and sort chat users
    const sortedChatUsers = chatUser
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => {
            // Extract usernames based on the current user
            const otherUsernameA = user._id === a.users[0] ? a.userUsername[1] : a.userUsername[0];
            const otherUsernameB = user._id === b.users[0] ? b.userUsername[1] : b.userUsername[0];

            // Check if each chat user matches the search text
            const isMatchA = otherUsernameA.toLowerCase().includes(searchText.toLowerCase());
            const isMatchB = otherUsernameB.toLowerCase().includes(searchText.toLowerCase());

            // Get the most recent message timestamp for each chat room
            const lastMessageA = chatMessage[a._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];
            const lastMessageB = chatMessage[b._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];

            const timestampA = lastMessageA ? new Date(lastMessageA.createdAt).getTime() : 0;
            const timestampB = lastMessageB ? new Date(lastMessageB.createdAt).getTime() : 0;

            // Sort logic
            if (isMatchA && !isMatchB) return -1; // Match A should come before B
            if (!isMatchA && isMatchB) return 1;  // Match B should come before A
            return timestampB - timestampA; // Otherwise, sort by the most recent message first
        });

    return (
        <>
            {chatUser.length !== 0 ? (
                <div className='Message-bar p25'>
                    <div style={{ fontSize: 28, textAlign: 'left', paddingLeft: 20, fontWeight: 600, paddingBottom: 20 }}>Messages</div>
                    <input 
                        className='message-user-search' 
                        placeholder='      Search...' 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)} 
                    />
                    <div className='Message-bar'>
                        {sortedChatUsers.map((info, index) => {
                            // Get the last message's timestamp
                            const lastMessage = chatMessage[info._id]?.filter(msg => msg.SenderId !== user._id).slice(-1)[0];
                            const lastMessageTimestamp = lastMessage?.createdAt || Date.now();

                            return (
                                <MessageBlock 
                                    key={info?._id || index} 
                                    chatRoomId={info?._id}
                                    image={info?.ChatIcon === 'NULL' 
                                        ? (user._id === info.users[0] ? info.usersImage[1] : info.usersImage[0]) 
                                        : info.ChatIcon}
                                    name={info?.ChatIcon === 'NULL' 
                                        ? (user._id === info.users[0] ? info.userUsername[1] : info.userUsername[0]) 
                                        : info.ChatIcon}
                                    icon={info?.ChatIcon}
                                    data={info._id}
                                    timestamp={lastMessageTimestamp}
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
