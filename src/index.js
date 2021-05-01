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
        this.getProjects();
    }

    state = {
        contentBlocks: [],
        about: false
    }

    getProjects = async () => {
        const query = '*[_type == "homeContent"]{contentBlocks[]{asset->{...}, ...}, title}';
        try {
            const response = await client.fetch(query);
            console.log(response);
            this.setState({
                contentBlocks: response[0].contentBlocks
            });
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
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)