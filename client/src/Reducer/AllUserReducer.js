import axios from "axios"
let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
const handleUnfriend = async (currentUserId,selectedFriendId,currentChatRoomId) => {
    try {
        const response = await axios.post(`${BACKWEB}/User/unFriendUser`, {
            userId: currentUserId,
            friendId: selectedFriendId,
            chatRoomId: currentChatRoomId,
        });

        if (response.status === 200) {
            console.log("Unfriended successfully");
            // Further actions on success (e.g., redirect, show a success message)
        }
    } catch (error) {
        console.error("Error unfriending the user", error);
        // Handle error (e.g., show an error message)
    }
};

export const globalUsers = (state,action)=>{
    switch(action.type){
        case 'globalUsers/setglobalUser':
            let data_={
                ...state,
                global:action.payload,
            }
            let dataUser = {};
            for(let i=0;i<data_.global.length;i++){
                dataUser[data_.global[i]._id] = data_.global[i];
            }
            data_={
                ...data_,
                Users:dataUser,
            }
            return data_;
        case "globalUsers/setFriends":
            const data={
                ...state,
                friends:action.payload
            }
                return data;
        case "globalUsers/addFriend":
            state.friends.push(action.payload)
            return state;
        case "globalUsers/unFriendUser":
            const {userId,friendsId,ChatRoomId} = action.payload;
            handleUnfriend(userId,friendsId,ChatRoomId);
            state.friends = state.friends.filter((item)=>item!==friendsId);
            return state;
        default:
            return state;
    }
}