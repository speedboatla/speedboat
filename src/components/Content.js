import React from 'react';
import ImageBlock from './ImageBlock';
import CarouselBlock from './CarouselBlock';
import MarqueeBlock from './MarqueeBlock';
import VimeoBlock from './VimeoBlock';
import './Content.scss';

class Content extends React.Component {

    mapBlocks = () => {
        return this.props.contentBlocks.map( block => {
            if (block._type === "singleImage") {
                return <ImageBlock content={block} key={block._key}/>;
            } else if (block._type === "imageCarousel") {
                return <CarouselBlock content={block} key={block._key}/>;
            } else if (block._type === "marqueeText") {
                return <MarqueeBlock content={block} key={block._key}/>;
            } else if (block._type === "vimeoLink") { 
                return <VimeoBlock content={block} key={block._key} />;
            } else {
                return "";
            }
        });
    }

    render() {
        return (
            <div className="content">
                {this.mapBlocks()}
            </div>
        );
    }
}

export default Content;