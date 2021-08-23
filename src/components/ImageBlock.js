import React from 'react';
import "./imageBlock.scss";
import VisibilitySensor from 'react-visibility-sensor';

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.imageEl = React.createRef();
    }

    state = {
        componentWidth: 0, 
        loaded: false,
        visible: false
    }

    componentDidMount() {
        let requestSize = Math.ceil(this.imageEl.current.offsetWidth / 250) * 250;
        this.setState({componentWidth: requestSize});
    }

    onVisChange = (isVisible) => {
        this.setState({visible: isVisible});
    }

    render() {
        return (
            <VisibilitySensor onChange={this.onVisChange}>
                <div key={this.props.content._key} className={`imageBlock${this.state.loaded ? "" : " hidden"}${this.state.visible ? " visible" : ""}`} ref={this.imageEl}>
                    {this.state.componentWidth > 0 ?
                        this.props.content.asset.url.includes("svg") ?
                            [
                                <div className="colorContain svg" key={this.props.content._key + "colorBlock"}>
                                    <div className="colorCover"></div>
                                <img 
                                    src={this.props.content.asset.url + `?w=${this.state.componentWidth}`} 
                                    key={this.props.content._key} 
                                    alt={this.props.content._key} 
                                    onLoad={() => {this.setState({loaded: true})}}
                                    style={{width: `${this.state.componentWidth}px`, height: 'auto'}}
                                />
                                </div>,
                                <p className="caption" key={this.props.content._key + "caption"}>{this.props.content.caption}</p>
                            ]
                        :   [
                                <div className="colorContain" key={this.props.content._key + "colorBlock"}>
                                    <div className="colorCover"></div>
                                    <img 
                                        src={this.props.content.asset.url + `?w=${this.state.componentWidth}`} 
                                        key={this.props.content._key} 
                                        alt={this.props.content._key} 
                                        onLoad={() => {this.setState({loaded: true})}}
                                    />
                                    </div>,
                                    <p className="caption" key={this.props.content._key + "caption"}>{this.props.content.caption}</p>
                            ]
                    : null}
                    
                </div>
            </VisibilitySensor>
        )
    }
}

export default ImageBlock;