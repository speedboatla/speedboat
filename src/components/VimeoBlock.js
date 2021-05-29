import React from 'react';
import Player from '@vimeo/player';
import VisibilitySensor from 'react-visibility-sensor';

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.imageEl = React.createRef();
    }

    state = {componentWidth: 0, videoPlayer: null, visible: false}

    componentDidMount() {
        let requestSize = Math.ceil(this.imageEl.current.offsetWidth / 250) * 250;
        this.setState({componentWidth: requestSize});
        console.log(this.props)
        let player = new Player(this.imageEl.current, {
            url: this.props.content.url,
            responsive: true,
            byline: false,
            controls: false,
            portrait: false,
            title: false,
            loop: true,
            muted: true
        });
        player.ready().then( () => {
            this.setState({videoPlayer: player});
            if (this.state.visible) {
                player.play();
            }
        });
    }

    onVisChange = (isVisible) => {
        this.setState({visible: isVisible});
        if ( this.state.videoPlayer ) {
            if (isVisible) {
                this.state.videoPlayer.play();
            } else {
                this.state.videoPlayer.pause();
            }
        }
    }

    render() {
        return (
            <VisibilitySensor onChange={this.onVisChange}>
                <div key={this.props.content._key} className="vimeoBlock" ref={this.imageEl}>

                </div>
            </VisibilitySensor>
        )
    }
}

export default ImageBlock;