import React from "react";
import ReactPlayer from "react-player";
import {Button} from "primereact/button";
import {connect} from "react-redux";
import SelectPlaylistV1 from "./SelectPlaylistV1";


class YoutubeV3 extends React.Component {

    constructor(props) {
        super(props);
        this.bottom = false;
        if (props.isBottom) {
            this.bottom = props.isBottom;
        }
        this.state = {
            videos: [],
            cars: [],
            isHovering: false,
            isBottom: this.bottom,

            currentVideoIndex: 0,

            url: props.url,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: true,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false


        };


        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseHoverLeave = this.handleMouseHoverLeave.bind(this);
        this.handleNextVideo = this.handleNextVideo.bind(this);
        this.handlePrevVideo = this.handlePrevVideo.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
    }

    handleMouseHover() {
        this.setState({muted: true});
    }

    handleMouseHoverLeave() {
        this.setState({muted: false});
    }

    handleNextVideo() {
        if ((this.state.currentVideoIndex + 1) === this.props.videos[this.props.index].urls.length) {
            //TODO: Get More Videos
            // return;
            this.setState({currentVideoIndex: 0});
            return;
        }
        this.setState({
            currentVideoIndex: (this.state.currentVideoIndex + 1)
        });
    }

    handlePrevVideo() {
        if (this.state.currentVideoIndex === 0) {
            return;
        }
        this.setState({
            currentVideoIndex: (this.state.currentVideoIndex - 1)
        });
    }

    handleEnded() {
        this.handleNextVideo();
    }

    componentDidMount() {
    }


    render() {
        console.log("VIDEOSSS:", this.props.videos[this.props.index].urls);
        const {playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip, currentVideoIndex} = this.state;
        return (
            <div style={{width: "100%", height: "100%"}}
                 onMouseEnter={this.handleMouseHoverLeave}
                 onMouseLeave={this.handleMouseHover}>
                <div>
                    <SelectPlaylistV1 index={this.props.index} visible={this.state.visible} onHide={() => this.setState({visible: false})}/>
                    <Button icon="pi pi-th-large" onClick={(e) => this.setState({visible: true})}/>
                    <Button icon="pi pi-arrow-left" onClick={(e) => this.handlePrevVideo()}/>
                    <Button icon="pi pi-arrow-right" onClick={(e) => this.handleNextVideo()}/>
                </div>
                <div style={{width: "100%", height: "100%"}}>
                    <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={this.props.videos[this.props.index].urls[currentVideoIndex]}
                        playing={playing}
                        controls={false}
                        light={false}
                        loop={false}
                        muted={muted}
                        onEnded={this.handleEnded}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                    />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        videos: state.videoUrls
    }
};

export default connect(mapStateToProps,
    null
)(YoutubeV3);
