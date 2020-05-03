import React from "react";
import youtube from "../apis/youtubeapi";
import {Carousel} from 'primereact/carousel'
import ReactPlayer from "react-player";
import {CarService} from "../../service/CarService";
import {Button} from "primereact/button";


export default class YoutubeV1 extends React.Component {

    constructor(props) {
        super(props);
       this.bottom = false;
       if (props.isBottom){
           this.bottom = props.isBottom;
       }
        this.state = {
            videos: [],
            cars: [],
            isHovering: false,
            isBottom:this.bottom,

            url: null,
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

        this.videoTemplate = this.videoTemplate.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseHoverLeave = this.handleMouseHoverLeave.bind(this);

        this.carservice = new CarService();
        this.carTemplate = this.carTemplate.bind(this);


    }

    componentDidMount() {
        this.handleSubmit('AUDI');
        // this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    carTemplate(car) {
        return (
            <div className="car-details">
                <div className="p-grid p-nogutter">
                    <div className="p-col-12">
                        <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand}/>
                    </div>
                    <div className="p-col-12 car-data">
                        <div className="car-title">{car.brand}</div>
                        <div className="car-subtitle">{car.year} | {car.color}</div>

                        <div className="car-buttons">
                            <Button icon="pi pi-search" className="p-button-secondary"/>
                            <Button icon="pi pi-star" className="p-button-secondary"/>
                            <Button icon="pi pi-cog" className="p-button-secondary"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    videoTemplate(video) {
        return (
            <div className="car-details">
                <div className="p-grid p-nogutter">
                    <div className="p-col-12">
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.description}
                             onClick={() => setTimeout(this.handleVideoSelect(video), 1)}
                        />
                    </div>
                </div>
            </div>
        );
    }


    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar,
                maxResults: 20
            }
        }).then(res => {
            this.setState({
                videos: res.data.items
            });
            let random = this.random(0, this.state.videos.length);
            console.log("RRRRRRRAAAAAAAAAAAAANNN",random);
            this.handleVideoSelect(this.state.videos[random]);
        }).catch(error => {
            console.log(JSON.stringify(error));
            if (error.response.status === 401) {
                window.location = "/#/login";
                console.error("Unauthorized User");
                return;
            }
            if (error.response.status === 404) {
                window.location = "/#/";
                console.error("Endpoint not found");
                return;
            }
            console.error("Error occurred for Rest Service. Error:" + JSON.stringify(error));
        });

    };
    handleVideoSelect = (video) => {
        if (video === null) {
            return;
        }
        this.setState({url: "https://www.youtube.com/watch?v=" + video.id.videoId})
    };

    ref = player => {
        this.player = player
    };

    getVideoDetail(isBottom) {
        if (isBottom){
            return ;
        }
        const {url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip} = this.state;
        if (url === null) {
            return;
        }
        return (<div  style={{height:"100%"}}
                onMouseEnter={this.handleMouseHoverLeave}
                onMouseLeave={this.handleMouseHover}>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                />
            </div>
        );
    }

    handleMouseHover() {
        this.setState({isHovering: true, muted: true});
        console.log("HOOOOWWWERRRR:", this.state.isHovering);
    }

    handleMouseHoverLeave() {
        this.setState({isHovering: false, muted: false});
        console.log("HOOOOWWWERRRR:", this.state.isHovering);
    }

    random(mn, mx) {
        return Math.floor(Math.random() * (mx - mn) + mn)-1;
    }


    handlePlayPause = () => {
        this.setState({playing: !this.state.playing})
    };

    handleStop = () => {
        this.setState({url: null, playing: false})
    };

    handleToggleControls = () => {
        const url = this.state.url;
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    };

    handleToggleLight = () => {
        this.setState({light: !this.state.light})
    };

    handleToggleLoop = () => {
        this.setState({loop: !this.state.loop})
    };

    handleVolumeChange = e => {
        this.setState({volume: parseFloat(e.target.value)})
    };

    handleToggleMuted = () => {
        this.setState({muted: !this.state.muted})
    };

    handleSetPlaybackRate = e => {
        this.setState({playbackRate: parseFloat(e.target.value)})
    };

    handleTogglePIP = () => {
        this.setState({pip: !this.state.pip})
    };

    handlePlay = () => {
        console.log('onPlay');
        this.setState({playing: true})
    };

    handleEnablePIP = () => {
        console.log('onEnablePIP');
        this.setState({pip: true})
    };

    handleDisablePIP = () => {
        console.log('onDisablePIP');
        this.setState({pip: false})
    };

    handlePause = () => {
        console.log('onPause');
        this.setState({playing: false})
    };

    handleSeekMouseDown = e => {
        this.setState({seeking: true})
    };

    handleSeekChange = e => {
        this.setState({played: parseFloat(e.target.value)})
    };

    handleSeekMouseUp = e => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    };

    handleProgress = state => {
        // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    };

    handleEnded = () => {
        console.log('onEnded')
        this.setState({playing: this.state.loop})
    };

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({duration})
    };


    render() {
        const customHeader = <h2>Selected Videos</h2>;
        console.log("Render:", this.props.video, this.props.loginGoogle);
        return (
            <div  style={{height:"100%"}}>
                {this.getVideoDetail(!this.state.isBottom)}
                <div className="carousel-demo">
                    <div className="content-section implementation">
                        <Carousel value={this.state.videos} itemTemplate={this.videoTemplate} numVisible={5}
                                  numScroll={1}
                                  className="custom-carousel"
                                  header={customHeader} circular={true}
                                  autoplayInterval={5000}
                                  responsive={this.responsiveSettings}/>
                    </div>
                </div>
                {this.getVideoDetail(this.state.isBottom)}
            </div>
        );
    }

}