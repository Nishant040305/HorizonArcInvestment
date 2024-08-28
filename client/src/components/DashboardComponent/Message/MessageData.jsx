import React, { useRef, useState, useEffect } from 'react';
import './MessageData.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllMessage, deleteChatRoom, deleteMessageIndex, SendMessage } from '../../../Store/MessageSlice';
import { socket } from '../../../Lib/socket';
import ConfirmPopup from '../../ConfirmPopup'; 
import { unFriendUser } from '../../../Store/globalUser';

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const DateDivider = ({ label }) => {
    return (
        <div className="date-divider">
            {label}
        </div>
    );
};

const MessageWrite = () => {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.message);
    const user = useSelector(state => state.user);
    const [text, setText] = useState('');
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const sendMessageFunc = (e) => {
        if (text.trim() !== '') {
            setText('');
            socket.emit('message', {
                ChatRoomId: chat.presentChat._id,
                message: text.trim(),
                SenderId: user._id,
                createdAt: Date.now()
            });
            e.target.value = '';
        }
    };

    return (
        <div className='MessageData-type bg-slate-200 flex flex-row'>
            <input
                type="text"
                className='bg-white text-black'
                placeholder='Type a message'
                value={text}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessageFunc(e);
                    }
                }}
            />
            <button className='bg-slate-200' onClick={sendMessageFunc}>
                <i className="fa-solid fa-circle-right bg-slate-200 text-green-500" style={{ fontSize: 35 }}></i>
            </button>
        </div>
    );
};

const Message_Send = (props) => {
    const dispatch = useDispatch();

    const deleteMessage = () => {
        if (props.user === '0') {
            dispatch(deleteMessageIndex({ ChatRoomId: props.chatRoom, _id: props.Id, index: props.index }));
        }
        props.toggleDelete();
    };

    return (
<div className='width-100'>
    <div className={`Messages-send flex text-black ${props.user === '0' ? "float-right bg-green-200" : "float-left bg-yellow-50"} relative`}>
        <div className='text-block'>
            {props.text}
        </div>
        {props.user === '0' ? (
            <div className="message-options flex items-center">
                <i className="fa-solid fa-chevron-down" style={{ fontSize: 13, paddingLeft: 10 }} onClick={props.toggleDelete}></i>
                <div className={`message-time ${props.user === '0' ? "text-left" : "text-right"}`}>
                    {props.time}
                    {props.isSeen.includes(props.otherUserId) ? (
                        <i className="fa-solid fa-check-double text-blue-500" style={{ paddingLeft: 5 }}></i>
                    ) : (
                        <i className="fa-solid fa-check text-green-400" style={{ paddingLeft: 5 }}></i>
                    )}
                </div>
            </div>
        ):(
            <div className="message-options flex items-center">
                <div className={`message-time ${props.user === '0' ? "text-left" : "text-right"}`}>
                    {props.time} 
                </div>
            </div>
        )}
        {props.del &&
            <div className={`absolute right-0 text-right message-editoption`} onClick={deleteMessage}>
                Delete 
            </div>
        }
    </div>
</div>

     
    );
};

const MessageData = () => {
    const chat = useSelector(state => state.message);
    const user = useSelector(state => state.user);
    const globaluser = useSelector(state => state.globalUsers.Users);
    const [chatOption, setOption] = useState(0);
    const [deleteStates, setDeleteStates] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    const messageAreaRef = useRef(null);

    const toggleDelete = (index) => {
        const newDeleteStates = [...deleteStates];
        newDeleteStates[index] = !newDeleteStates[index];
        setDeleteStates(newDeleteStates);
    };

    const image = chat?.presentChat?.ChatIcon === 'NULL'
        ? (user._id === chat?.presentChat?.users[0] ? globaluser[chat.presentChat.users[1]].image : globaluser[chat.presentChat.users[0]].image)
        : chat?.presentChat?.ChatIcon;
    const name = chat?.presentChat?.ChatIcon === 'NULL'
        ? (user._id === chat?.presentChat?.users[0] ? globaluser[chat.presentChat.users[1]].Username : globaluser[chat.presentChat.users[0]].Username)
        : chat?.presentChat?.ChatIcon;

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [chat?.message[chat?.presentChat?._id]]);

    const deleteAllChat = () => {
        dispatch(deleteAllMessage(chat.presentChat._id));
        socket.emit('Delete-All-Chat', chat.presentChat._id);
    };
    const unfriendUser = () => {
        // Logic to unfriend the user
        console.log("User unfriended");
        // Then delete the chats
        dispatch(deleteAllMessage(chat.presentChat._id));
        socket.emit('Delete-All-Chat', chat.presentChat._id);
        dispatch(unFriendUser({userId:user._id,ChatRoomId:chat.presentChat._id,friendsId:chat.presentChat.users[0]==user._id?chat.presentChat.users[1]:chat.presentChat.users[0]}))
        socket.emit('unFriend-user',{userId:user._id,ChatRoomId:chat.presentChat._id,friendsId:chat.presentChat.users[0]==user._id?chat.presentChat.users[1]:chat.presentChat.users[0]})
        dispatch(deleteChatRoom({ChatRoomID:chat.presentChat._id}))
        // Close the popup
        setShowConfirmPopup(false);
    };

    const renderMessagesWithDateDividers = () => {
        let lastMessageDate = null;
    
        return chat?.message[chat?.presentChat?._id].map((info, index) => {
            const messageDate = new Date(info.createdAt);
            const formattedDate = messageDate.toLocaleDateString();
            let showDateDivider = false;
            let dateLabel = formattedDate;
    
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
    
            if (formattedDate === today.toLocaleDateString()) {
                dateLabel = "Today";
            } else if (formattedDate === yesterday.toLocaleDateString()) {
                dateLabel = "Yesterday";
            } else {
                dateLabel = messageDate.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            }
    
            if (formattedDate !== lastMessageDate) {
                lastMessageDate = formattedDate;
                showDateDivider = true;
            }
    
            // Determine the ID of the other user in the chat
            const otherUserId = chat.presentChat.users.find(id => id !== user._id);
    
            return (
                <React.Fragment key={index}>
                    {showDateDivider && <DateDivider label={dateLabel} />}
                    <Message_Send
                        text={info?.message}
                        user={info?.SenderId === user?._id ? '0' : '1'}
                        time={formatTime(info?.createdAt)}
                        index={index}
                        chatRoom={info.ChatRoomId}
                        Id={info._id}
                        del={deleteStates[index]}
                        toggleDelete={() => toggleDelete(index)}
                        isSeen={info?.isSeen || []}  // Pass the isSeen array
                        otherUserId={otherUserId}    // Pass the other user's ID
                    />
                </React.Fragment>
            );
        });
    };
    

    return (
        <div className={`MessageData ${image ? 'width-80' : 'width-100'}`}>
            {image && (
                <div className='MessageData-head justify-between bg-slate-100'>
                    <div className='flex flex-row'>
                        <img src={image} className='rounded-full w-16 h-16' alt="chat icon" />
                        {name}
                    </div>
                    <div onClick={() => { setOption(1 - chatOption) }} className='relative w-20' style={{ zIndex: 10000 }}>
                        <i className="fas fa-ellipsis-v"></i>
                        {chatOption === 1 && (
                            <div className='flex flex-col absolute right-9'>
                                <div className='bg-white delete-chat right-9' onClick={() => { deleteAllChat() }}>Delete Chats</div>
                                <div className='bg-white delete-chat right-9' onClick={() => setShowConfirmPopup(true)}>Unfriend User</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className={`MessageArea`} ref={messageAreaRef}>
                {chat.presentChat ? renderMessagesWithDateDividers() : (
                    <div className='flex flex-row justify-center'>
                        <img className='empty-cart' src="Screenshot_2024-08-23_194614-removebg-preview.png" alt="empty chat" />
                    </div>
                )}
            </div>
            <MessageWrite />
            <ConfirmPopup 
                show={showConfirmPopup} 
                onClose={() => setShowConfirmPopup(false)} 
                onConfirm={unfriendUser} 
            />
        </div>
    );
};

export default MessageData;
