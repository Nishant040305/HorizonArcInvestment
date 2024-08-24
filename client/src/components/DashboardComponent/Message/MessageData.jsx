import React, { useRef, useState, useEffect } from 'react';
import './MessageData.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageIndex, SendMessage } from '../../../Store/MessageSlice';
import { socket } from '../../../Lib/socket';

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
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
        <>
            <div className='width-100'>
                <div className={`Messages-send text-black ${props.user === '0' ? "float-right bg-green-200" : "float-left bg-yellow-50"} relative`}>
                    <div>
                        {props.text}
                        {props.user === '0' &&
                            <i className="fa-solid fa-chevron-down" style={{ fontSize: 13, paddingLeft: 10 }} onClick={props.toggleDelete}></i>
                        }
                    </div>
                    <div className={`message-time ${props.user === '0' ? "text-left" : "text-right"}`}>{props.time}</div>
                    {props.del &&
                        <div className={`absolute right-0 text-right bg-yellow-50 p-1`} onClick={deleteMessage}>
                            Delete 
                        </div>
                    }
                </div>
            </div>
        </>
    );
};



const MessageData = () => {
    const chat = useSelector(state => state.message);
    const user = useSelector(state => state.user);
    const [chatOption, setOption] = useState(0);
    const [deleteStates, setDeleteStates] = useState([]);

    const toggleDelete = (index) => {
        const newDeleteStates = [...deleteStates];
        newDeleteStates[index] = !newDeleteStates[index];
        setDeleteStates(newDeleteStates);
    };

    const image = chat?.presentChat?.ChatIcon === 'NULL'
        ? (user._id === chat?.presentChat?.users[0] ? chat?.presentChat?.usersImage[1] : chat?.presentChat?.usersImage[0])
        : chat?.presentChat?.ChatIcon;
    const name = chat?.presentChat?.ChatIcon === 'NULL'
        ? (user._id === chat?.presentChat?.users[0] ? chat?.presentChat?.userUsername[1] : chat?.presentChat?.userUsername[0])
        : chat?.presentChat?.ChatIcon;

    const messageAreaRef = useRef(null);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [chat?.message[chat?.presentChat?._id]]);

    return (
        <div className={`MessageData ${image ? 'width-80' : 'width-100'}`}>
            {image && <div className='MessageData-head justify-between bg-slate-100'>
                <div className='flex flex-row'>
                    <img src={image} className='rounded-full w-16 h-16' alt="chat icon" />
                    {name}
                </div>
                <div onClick={() => { setOption(1 - chatOption) }} className='relative w-20'>
                    <i className="fas fa-ellipsis-v"></i>
                    {chatOption === 1 && <div className='flex flex-col absolute right-9'>
                        <div className='bg-white delete-chat right-9'>Delete Chats</div>
                        <div className='bg-white delete-chat right-9'>Block User</div>
                    </div>}
                </div>
            </div>}
            <div className={`MessageArea`} ref={messageAreaRef}>
                {chat.presentChat ? chat?.message[chat?.presentChat?._id].map((info, index) => (
                    <Message_Send
                        key={index}
                        text={info?.message}
                        user={info?.SenderId === user?._id ? '0' : '1'}
                        time={formatTime(info?.createdAt)}
                        index={index}
                        chatRoom={info.ChatRoomId}
                        Id={info._id}
                        del={deleteStates[index]}
                        toggleDelete={() => toggleDelete(index)}
                    />
                )) : <div className='flex flex-row justify-center'>
                    <img className='empty-cart' src="Screenshot_2024-08-23_194614-removebg-preview.png" alt="empty chat" />
                </div>}
            </div>
            <MessageWrite />
        </div>
    );
};

export default MessageData;
