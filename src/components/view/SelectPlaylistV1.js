import React from 'react';
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import YoutubePlayListV1 from "./YoutubePlayListV1";


export default class SelectPlaylistV1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 99
        }

    }

    handleMinePlaylist = () => {
        if (this.state.selectedIndex === 99) {
            return (
                <div className="car-details">
                    <div className="p-grid p-nogutter">
                        <div className="p-col-2">
                            <div className="p-grid p-nogutter">
                                <div className="p-col-12">
                                    <img
                                        src="https://www.pikpng.com/pngl/m/60-600123_youtube-playlist-icon-youtube-playlist-icon-png-clipart.png"
                                        alt="YourPlaylist"
                                        onClick={() => this.setState({selectedIndex: 0})}
                                        style={{height: "100px"}}
                                    />
                                </div>
                                <div className="p-col-12">
                                    <div className="car-title">{"MyList"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-2">
                            <div className="p-grid p-nogutter">
                                <div className="p-col-12">
                                    <img
                                        src="https://www.pikpng.com/pngl/m/60-600123_youtube-playlist-icon-youtube-playlist-icon-png-clipart.png"
                                        alt="YourPlaylist"
                                        onClick={() => this.setState({selectedIndex: 0})}
                                        style={{height: "100px"}}
                                    />
                                </div>
                                <div className="p-col-12">
                                    <div className="car-title">{"MyList"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-2">
                            <div className="p-grid p-nogutter">
                                <div className="p-col-12">
                                    <img
                                        src="https://www.pikpng.com/pngl/m/60-600123_youtube-playlist-icon-youtube-playlist-icon-png-clipart.png"
                                        alt="YourPlaylist"
                                        onClick={() => this.setState({selectedIndex: 0})}
                                        style={{height: "100px"}}
                                    />
                                </div>
                                <div className="p-col-12">
                                    <div className="car-title">{"MyList"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.selectedIndex === 0) {
            return (
                <div className="p-grid">
                    <div className="p-col-fixed" style={{width: '100px'}}>
                        <Button label={"BACK"} onClick={() => this.setState({selectedIndex: 99})}/>
                    </div>
                    <div className="p-col" style={{height: '100%'}}>
                        <YoutubePlayListV1 handlePlayListVideos={this.handlePlayListVideos} index={this.props.index} onHide={() => this.props.onHide()}/>
                    </div>
                </div>
            );
        }


    };

    handlePlayListVideos = () => {
        console.log("NOT IMPLEMENTED");
    };


    render() {
        return (
            <div>
                <Sidebar style={{background: "azure"}} visible={this.props.visible} position={"top"}
                         onHide={(e) => this.props.onHide()}>
                    {this.handleMinePlaylist()}
                </Sidebar>
            </div>
        );
    }

}
