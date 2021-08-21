import React from 'react';
import ReactDOM from 'react-dom';
import sanityClient from '@sanity/client';
import './Global.scss';

import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';


const client = sanityClient({
    projectId: '68oztumj',
    dataset: 'production',
    apiVersion: '2020-04-20',
    token: '',
    useCdn: true,
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: 'Loading...',
            blockIndex: 0,
            contentBlocks: [],
            about: false
        }
        this.getProjects();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.watchScroll);
    }

    watchScroll = (event) => {
        if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) && this.state.loading === 'Not loading.' && !this.state.about) {
            this.setState({loading: 'Loading...'});
            this.getProjects();
        }
    }

    

    getProjects = async () => {
        const query = `*[_type == "homeContent"] {contentBlocks[${this.state.blockIndex}...${this.state.blockIndex + 10}]{asset->{...}, ...}}`;
        try {
            const response = await client.fetch(query);

            if (response[0].contentBlocks.length > 0) {
                this.setState({
                    contentBlocks: this.state.contentBlocks.concat(response[0].contentBlocks),
                    blockIndex: this.state.blockIndex + 10,
                    loading: 'Not loading.',
                });
            } else {
                this.setState({
                    loading: 'No more posts.'
                });
                window.removeEventListener('scroll', this.watchScroll);
            }
        } catch {
            console.log("error");
        }
    }

    toggleAbout = (newAbout = !this.state.about) => {
        if (newAbout && this.state.alignTop) {
            this.setState({about: newAbout, alignTop: false});
        } else if (!newAbout && this.state.alignTop) {
            this.setState({about: newAbout, alignTop: false})
        } else {
            this.setState({about: newAbout});
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Header toggleAbout={this.toggleAbout} about={this.state.about}/>
                {this.state.about ? <About /> : <Content contentBlocks={this.state.contentBlocks} />}
                {this.state.loading === "Not loading." || this.state.about ? null : <p style={{textAlign: "center"}}>{this.state.loading}</p>}
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)