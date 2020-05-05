import React from "react";
import {connect} from "react-redux";
import youtube from "../apis/youtubeapi";
import {Carousel} from 'primereact/carousel';
import {loadVideo} from "../../actions";
import '../../css/YoutubeViewV1.css'


class YoutubePlayListV1 extends React.Component {

    constructor(props) {
        super(props);
        let list = [];
        if (props.playlist !== undefined && props.playlist !== null && props.playlist.length > 0) {
            list = props.playlist;
        }
        this.state = {
            currentVideoIndex: 0,
            playlist: list,
            playlistVideos: [],
            selectedPlayList: null
        };


        this.responsiveSettings = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        this.listTemplate = this.listTemplate.bind(this);
        this.handleSelectedPlaylist = this.handleSelectedPlaylist.bind(this);
    }


    componentDidMount() {
        console.log("GoogleApi:", this.props.loginGoogle);
    }

    componentDidUpdate() {

    }

    handleSubmit = async () => {
        if (this.state.playlist.length > 0) {
            return;
        }
        const token = this.props.loginGoogle.auth.currentUser.ie.tc;
        if (token === null) {
            return;
        }
        console.log("LOGINGOOGLE:", token, token.access_token, token.token_type);
        await youtube.get('/playlists', {
            params: {
                maxResults: 20,
                part: 'snippet,contentDetails',
                mine: true
            },
            headers: {
                Authorization: token.token_type + ' ' + token.access_token
            }
        }).then(res => {
            this.setState({
                playlist: res.data.items
            });

        }).catch(error => {
            console.log("ERROR:", error);
            if (error.response.status === 401) {
                console.error("Unauthorized User");
                return;
            }
            if (error.response.status === 404) {
                console.error("Endpoint not found");
                return;
            }
            console.error("Error occurred for Rest Service. Error:" + JSON.stringify(error));
        });

    };

    handleCategoryPlayList = async (channelId) => {
        if (this.state.playlist.length > 0) {
            return;
        }
        const token = this.props.loginGoogle.auth.currentUser.ie.tc;
        if (token === null) {
            return;
        }
        console.log("LOGINGOOGLE:", token, token.access_token, token.token_type);
        console.log("CHANNELID:", channelId);
        await youtube.get('/search', {
            params: {
                maxResults: 40,
                part: 'snippet',
                channelId: channelId,
                q: 'surfing'
            },
            headers: {
                Authorization: token.token_type + ' ' + token.access_token
            }
        }).then(res => {
            this.setState({
                playlist: res.data.items
            });
            console.log("Category Playlist:", this.state.playlist);

        }).catch(error => {
            console.log("ERROR:", error);
            if (error.response.status === 401) {
                console.error("Unauthorized User");
                return;
            }
            if (error.response.status === 404) {
                console.error("Endpoint not found");
                return;
            }
            console.error("Error occurred for Rest Service. Error:" + JSON.stringify(error));
        });

    };


    handleVideos = async (playlistId, channelId) => {
        if (this.state.playlist.length <= 0) {
            return;
        }
        const token = this.props.loginGoogle.auth.currentUser.ie.tc;
        if (token === null) {
            return;
        }
        console.log("LOGINGOOGLE:", token, token.access_token, token.token_type);
        await youtube.get('/playlistItems', {
            params: {
                maxResults: 20,
                part: 'snippet,contentDetails',
                playlistId: playlistId,
                channelId: channelId
            },
            headers: {
                Authorization: token.token_type + ' ' + token.access_token
            }
        }).then(res => {
            console.log("PlayListVideos:", res.data);
            this.props.loadVideo(this.props.index, res.data.items.map(item => "https://www.youtube.com/watch?v=" + item.contentDetails.videoId));
            this.setState({
                playlistVideos: res.data.items
            });
            this.props.onHide.apply();

        }).catch(error => {
            console.log("ERROR:", error);
            if (error.response.status === 401) {
                console.error("Unauthorized User");
                return;
            }
            if (error.response.status === 404) {
                console.error("Endpoint not found");
                return;
            }
            console.error("Error occurred for Rest Service. Error:" + JSON.stringify(error));
        });
    };


    handleSelectedPlaylist(item) {
        if (item.id.playlistId === undefined || item.id.playlistId === null) {
            this.handleVideos(item.id, item.snippet.channelId);
            return;
        }
        this.handleVideos(item.id.playlistId, item.snippet.channelId);
    }


    listTemplate(item) {
        let fixTitle = item.snippet.title;
        if (fixTitle.length > 30){
            fixTitle = fixTitle.substring(0, 30);
        }
        return (
                <div className="p-grid p-nogutter carousel-template-my">
                    <div className="p-col-12">
                        <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title}
                             onClick={(e) => this.handleSelectedPlaylist(item)}/>
                    </div>
                    <div className="p-col-12 carousel-template-text-my">
                        {fixTitle}
                    </div>
                </div>
        );
    }


    render() {

        if (this.props.loginGoogle === null) {
            return <div>LOADING</div>;
        }
        if (this.props.channelId) {
            this.handleCategoryPlayList(this.props.channelId);
        } else {
            this.handleSubmit();
        }

        return (
            <div className="carousel-my">
                    <Carousel value={this.state.playlist} itemTemplate={this.listTemplate} numVisible={8} numScroll={1}
                              responsive={this.responsiveSettings}/>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loginGoogle: state.loginGoogle,
        videos: state.videos
    }
};

export default connect(
    mapStateToProps,
    {loadVideo}
)(YoutubePlayListV1);
