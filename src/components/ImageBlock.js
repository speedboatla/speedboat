import React from 'react';

class ImageBlock extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="imageBlock">
                <img src={this.props.content.asset.url} key={this.props.content._key} />
            </div>
        )
    }
}

export default ImageBlock;