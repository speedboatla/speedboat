import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
    state = {
        show: true,
    }

    componentDidMount() {
        window.addEventListener('wheel', this.watchScroll);
    }

    watchScroll = (event) => {
        if (event.deltaY > 0) {
            this.setState({show: false});
        } else {
            this.setState({show: true});
        }
    }

    toggleShow = (newShow = !this.state.show) => {
        this.setState({show: newShow});
    }

    render() {
        return (
            <div className={this.state.show ? "show footer" : "hide footer"}>
                <ul className="footerList">
                    <li><a href="mailto:info@speedboatprojects.com">info@speedboatprojects.com</a></li>
                    <li><a href="https://www.instagram.com/speedboatprojects/" target="_blank" rel="noreferrer">Instagram</a></li>
                    <li><a href="tel:+1 323-450-7551">+1 323-450-7551</a></li>
                    <li><a href="https://www.google.com/maps/place/Silver+Lake,+Los+Angeles,+CA/@34.0932274,-118.2849349,14z/data=!3m1!4b1!4m5!3m4!1s0x80c2c73a7425883f:0xed2d053e27a4d706!8m2!3d34.0869409!4d-118.2702036" target="_blank" rel="noreferrer">California</a> & <a href="https://www.google.com/maps/place/Morningside+Heights,+New+York,+NY/@40.8099729,-73.9725064,15z/data=!3m1!4b1!4m5!3m4!1s0x89c2f63f08cd0763:0x77809d4d5fe45c5!8m2!3d40.8105443!4d-73.9620581" target="_blank" rel="noreferrer">New York</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer;