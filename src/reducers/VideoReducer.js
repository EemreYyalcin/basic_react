let videos = [
    {urls:[
            "https://www.youtube.com/watch?v=hzdIoghbFzg",
            "https://www.youtube.com/watch?v=sui9MKrDnQk",
            "https://www.youtube.com/watch?v=6ttobrfMnyQ",
            "https://www.youtube.com/watch?v=3OnnDqH6Wj8"
        ]},
    {urls:[
            "https://www.youtube.com/watch?v=hzdIoghbFzg",
            "https://www.youtube.com/watch?v=sui9MKrDnQk",
            "https://www.youtube.com/watch?v=6ttobrfMnyQ",
            "https://www.youtube.com/watch?v=3OnnDqH6Wj8"
        ]},
    {urls:[
            "https://www.youtube.com/watch?v=hzdIoghbFzg",
            "https://www.youtube.com/watch?v=sui9MKrDnQk",
            "https://www.youtube.com/watch?v=6ttobrfMnyQ",
            "https://www.youtube.com/watch?v=3OnnDqH6Wj8"
        ]},
    {urls:[
            "https://www.youtube.com/watch?v=hzdIoghbFzg",
            "https://www.youtube.com/watch?v=sui9MKrDnQk",
            "https://www.youtube.com/watch?v=6ttobrfMnyQ",
            "https://www.youtube.com/watch?v=3OnnDqH6Wj8"
        ]}];

export const VideoReducer = (state = videos, action) => {
    if (action.type === 'LOAD_VIDEO') {
        console.log('REDUCER VIDEO:', action.payload);
        videos[action.payload.index].urls = action.payload.urls;
        return videos;
    }
    return state;
};