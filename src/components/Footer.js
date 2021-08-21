import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.lastScrollPos = 0;
        this.currentScrollpos = 0;
        this.footerEl = React.createRef();
    }

    state = {
        show: true,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.watchScrollFooter);

    }

    watchScrollFooter = (event) => {
        this.currentScrollpos = window.pageYOffset;

        if ((this.currentScrollpos > this.lastScrollPos) && this.state.show) {
            this.setState({show: false});
        } else if ((this.currentScrollpos <= this.lastScrollPos) && !this.state.show) {
            this.setState({show: true});
        }

        this.lastScrollPos = this.currentScrollpos;
    }

    toggleShow = (newShow = !this.state.show) => {
        this.setState({show: newShow});
    }

    render() {
        return (
            <div className={this.state.show ? "show footer" : "hide footer"} ref={this.footerEl}>
                <ul className="footerList">
                    <li><a href="mailto:info@speedboatprojects.com">EMAIL</a></li>
                    <li><a href="https://www.instagram.com/speedboat.la" target="_blank" rel="noreferrer">DM</a></li>
                    <li><a href="tel:+1 323-450-7551">TEL</a></li>
                    <li><a href="https://www.google.com/maps/place/Silver+Lake,+Los+Angeles,+CA/@34.0932274,-118.2849349,14z/data=!3m1!4b1!4m5!3m4!1s0x80c2c73a7425883f:0xed2d053e27a4d706!8m2!3d34.0869409!4d-118.2702036" target="_blank" rel="noreferrer">MAP</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer;