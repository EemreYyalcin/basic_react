import React from 'react';
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import YoutubePlayListV1 from "./YoutubePlayListV1";
import youtube from "../apis/youtubeapi";
import {connect} from "react-redux";
import {Carousel} from "primereact/carousel";
import '../../css/YoutubeViewV1.css'


class SelectPlaylistV1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 99,
            categories: [],
            mainTitles: ["YourPlaylist", "Favorite Categories", "Added"],
            categoryChannelId: null
        };

        this.categoryTemplate = this.categoryTemplate.bind(this);
        this.handleMainCategoryOnClick = this.handleMainCategoryOnClick.bind(this);
        this.mainCategoryTemplate = this.mainCategoryTemplate.bind(this);
    }

    handleCategory = async () => {
        if (this.state.categories.length > 0) {
            return;
        }
        const token = this.props.loginGoogle.auth.currentUser.ie.tc;
        if (token === null) {
            return;
        }

        await youtube.get('/videoCategories', {
            params: {
                part: 'snippet',
                regionCode: 'TR'
            },
            headers: {
                Authorization: token.token_type + ' ' + token.access_token
            }
        }).then(res => {
            this.setState({
                categories: res.data.items,
                selectedIndex: 1
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

    handleMainCategoryOnClick(title){
        let index = 99;
        let titles = this.state.mainTitles;

        for (let i=0; i<titles.length; ++i){
            if (titles[i] === title){
                index = i;
                break;
            }
        }

        if (index === 1){
            this.handleCategory();
            return;
        }
        this.setState({selectedIndex: index});
    }


    handleMinePlaylist = () => {

        if (this.state.selectedIndex === 99) {
            return (
                <div className="carousel-my">
                    <div className="content-section implementation">
                        <Carousel value={this.state.mainTitles} itemTemplate={this.mainCategoryTemplate}
                                  numVisible={8}
                                  numScroll={5} responsive={this.responsiveSettings}/>
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
                        <YoutubePlayListV1 handlePlayListVideos={this.handlePlayListVideos} index={this.props.index}
                                           onHide={() => this.props.onHide()}/>
                    </div>
                </div>
            );
        }

        if (this.state.selectedIndex === 1) {
            return (
                <div className="p-grid">
                    <div className="p-col-fixed" style={{width: '100px'}}>
                        <Button label={"BACK"} onClick={() => this.setState({selectedIndex: 99})}/>
                    </div>
                    <div className="p-col" style={{height: '100%', width: "80%"}}>
                        <div className="carousel-demo" style={{height: "100%"}}>
                            <div className="content-section implementation">
                                <Carousel value={this.state.categories} itemTemplate={this.categoryTemplate}
                                          numVisible={8}
                                          numScroll={5} responsive={this.responsiveSettings}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.selectedIndex === 2) {
            return (
                <div className="p-grid">
                    <div className="p-col-fixed" style={{width: '100px'}}>
                        <Button label={"BACK"} onClick={() => this.setState({selectedIndex: 99})}/>
                    </div>
                    <div className="p-col" style={{height: '100%'}}>
                        <YoutubePlayListV1 index={this.props.index}
                                           onHide={() => this.props.onHide()} channelId={this.state.categoryChannelId}/>
                    </div>
                </div>
            );
        }


    };



    mainCategoryTemplate(title) {
        return (
                <div className="p-grid p-nogutter carousel-template-my">
                    <div className="p-col-12">
                        <img
                            src="https://www.pikpng.com/pngl/m/60-600123_youtube-playlist-icon-youtube-playlist-icon-png-clipart.png"
                            alt={title}
                            onClick={() => this.handleMainCategoryOnClick(title)}
                            style={{height: "100px"}}
                        />
                    </div>
                    <div className="p-col-12 car-data">
                        <div className="car-title">{title}</div>
                    </div>
                </div>
        );
    }

    categoryTemplate(item) {
        return (
            <div className="car-details" style={{width: "25px"}}>
                <div className="p-grid p-nogutter">
                    <div className="p-col-12">
                        <img
                            src="https://www.pikpng.com/pngl/m/60-600123_youtube-playlist-icon-youtube-playlist-icon-png-clipart.png"
                            alt={item.snippet.title}
                            onClick={(e) => this.setState({selectedIndex: 2, categoryChannelId: item.snippet.channelId})}
                            style={{height: "50px"}}/>
                    </div>
                    <div className="p-col-12 car-data">
                        <div className="car-title">{item.snippet.title}</div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return (
            <div>
                <Sidebar className={"sidebar-my"} visible={this.props.visible} position={"top"}
                         onHide={(e) => this.props.onHide()}>
                    {this.handleMinePlaylist()}
                </Sidebar>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loginGoogle: state.loginGoogle,
        videos: state.videos
    }
};

export default connect(
    mapStateToProps,
    null
)(SelectPlaylistV1);

