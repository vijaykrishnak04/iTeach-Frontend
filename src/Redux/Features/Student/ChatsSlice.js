import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { fetchChatMessagesApi, fetchChatListApi } from '../../../Services/Student';

const initialState = {
    chatMessages: [],
    chatList: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Fetch chat messages with a student
export const fetchChatMessages = createAsyncThunk('chatData/fetchChatMessages', async (teacherId) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await fetchChatMessagesApi(teacherId, headers)
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

// Fetch list of students who've messaged the teacher
export const fetchChatList = createAsyncThunk('chatData/fetchChatList', async (id) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await fetchChatListApi(id, headers)
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});


const chatSlice = createSlice({
    name: 'studentChatData',
    initialState,
    reducers: {
        addMessageToChatList: (state, action) => {
            const incomingMessage = action.payload;
            const chatSessionIndex = state.chatList.findIndex(chat => chat.teacherId === incomingMessage.senderId);

            if (chatSessionIndex > -1) {
                const chatSession = state.chatList[chatSessionIndex];
                chatSession.messages = chatSession.messages ? [...chatSession.messages, incomingMessage] : [incomingMessage];

                state.chatList.splice(chatSessionIndex, 1);  // remove the chatSession from its current position
                state.chatList.unshift(chatSession);  // add it to the beginning
            }
        },
        addYourMessageToChatList: (state, action) => {
            const incomingMessage = action.payload;
            const chatSessionIndex = state.chatList.findIndex(chat => chat.teacherId === incomingMessage.recieverId);

            if (chatSessionIndex > -1) {
                const chatSession = state.chatList[chatSessionIndex];
                chatSession.messages = chatSession.messages ? [...chatSession.messages, incomingMessage] : [incomingMessage];

                state.chatList.splice(chatSessionIndex, 1);  // remove the chatSession from its current position
                state.chatList.unshift(chatSession);  // add it to the beginning
            }
        },
        addChatToChatList: (state, action) => {
            const newChatSession = action.payload;
            state.chatList.unshift(newChatSession);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chatMessages = action.payload;
            })
            .addCase(fetchChatMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching chat messages';
            })

            .addCase(fetchChatList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChatList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chatList = action.payload;
            })
            .addCase(fetchChatList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching chat list';
            })
    },
});

export const { addMessageToChatList, addYourMessageToChatList, addChatToChatList } = chatSlice.actions;
export default chatSlice.reducer;
