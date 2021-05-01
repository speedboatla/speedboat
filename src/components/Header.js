import React from 'react';
import './Header.scss';


class Header extends React.Component {
    state = {
        alignTop: true,
    }

    componentDidMount() {
        window.addEventListener('wheel', this.watchScroll);
    }

    watchScroll = (event) => {
        if (event.deltaY > 0) {
            this.setState({alignTop: false});
        } else {
            this.setState({alignTop: true});
        }
    }

    toggleTopAlign = (newAlignTop = !this.state.alignTop) => {
        this.setState({alignTop: newAlignTop});
    }

    

    render() {
        return (
            <div className={this.state.alignTop ? "big header" : "small header"}>
                <div className="innerHeader">
                    <h1>Speedboat Projects</h1>
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