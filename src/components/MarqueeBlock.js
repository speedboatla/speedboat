import React from 'react';
import Marquee from "react-fast-marquee";


class MarqueeBlock extends React.Component {

    render() {
        return (
            <div className="marqueeBlock">
                <Marquee
                 speed={100}
                >
                    <p>{this.props.content.value}</p>
                </Marquee>
            </div>
        )
    }
}

export default MarqueeBlock;