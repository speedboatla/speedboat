import React from 'react';
import './Header.scss';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.lastScrollPos = 0;
        this.currentScrollpos = 0;
    }

    state = {
        alignTop: true,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.watchScroll);
    }

    watchScroll = (event) => {
        this.currentScrollpos = window.pageYOffset;
        if (this.currentScrollpos > 20) {
            if ( (this.currentScrollpos > this.lastScrollPos) && this.state.alignTop) {
                this.setState({alignTop: false});
            } else if ((this.currentScrollpos <= this.lastScrollPos) && !this.state.alignTop) {
                this.setState({alignTop: true});
            }
        } else {
            if (!this.state.alignTop) {
                this.setState({alignTop: true});
            }
        }

        this.lastScrollPos = this.currentScrollpos;
    }

    toggleTopAlign = (newAlignTop = !this.state.alignTop) => {
        this.setState({alignTop: newAlignTop});
    }
    

    render() {
        return (
            <div className={this.state.alignTop ? "header" : "hide header"}>
                <div className="innerHeader">
                    <h1>SPEEDBOAT</h1>
                    <button
                    className={this.props.about ? "menuItem desktop" : "menuItem desktop active"}
                    onClick={() => this.props.toggleAbout(false)}
                    >
                        WORK
                    </button>
                    <button 
                    className={this.props.about ? "menuItem desktop active" : "menuItem desktop"}
                    onClick={() => this.props.toggleAbout(true)}
                    >
                        ABOUT
                    </button>
                    <button 
                    className={"menuItem phone active"}
                    onClick={() => this.props.toggleAbout()}
                    >
                        {this.props.about ? "WORK" : "ABOUT"}
                    </button>
                </div>
            </div>
        );
    }
}

export default Header;