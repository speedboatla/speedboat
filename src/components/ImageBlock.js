import React from 'react';

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.imageEl = React.createRef();
    }

    state = {componentWidth: 0}

    componentDidMount() {
        let requestSize = Math.ceil(this.imageEl.current.offsetWidth / 250) * 250;
        this.setState({componentWidth: requestSize});
    }

    render() {
        return (
            <div key={this.props.content._key} className="imageBlock" ref={this.imageEl}>
                {this.state.componentWidth > 0 ? 
                    [ 
                        <img src={this.props.content.asset.url + `?w=${this.state.componentWidth}`} key={this.props.content._key} alt={this.props.content._key} />,
                        <p className="caption" key={this.props.content._key + "caption"}>{this.props.content.caption}</p>
                    ]
                : null}
                
            </div>
        )
    }
}

export default ImageBlock;