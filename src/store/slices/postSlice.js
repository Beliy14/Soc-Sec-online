import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push({
                text: action.payload,
                likes: 0,
                id: Date.now(),
                date: new Date().toDateString().replace(/^\w+\s/, '')
            });
        },
        addLike: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload);
            if (post) {
                post.likes = post.likes === 0 ? 1 : 0;
            }
        }
    }
})

export const { addPost, addLike } = postSlice.actions;
export default postSlice.reducer;