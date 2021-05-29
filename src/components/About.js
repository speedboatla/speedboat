import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';
import sanityClient from '@sanity/client';
import parse from 'html-react-parser';
import './About.scss';

const client = sanityClient({
    projectId: '68oztumj',
    dataset: 'production',
    apiVersion: '2020-04-20',
    token: '',
    useCdn: true,
});

class About extends React.Component {
    constructor() {
        super();
        this.getAboutContent();
    }

    state = {
        leftColumn: [],
        rightColumn: [],
    }

    getAboutContent = async () => {
        const query = '*[_type == "about"]{...}';
        try {
            const response = await client.fetch(query);
            console.log(response);
            if (response[0].leftColumn) {
                this.setState({leftColumn: response[0].leftColumn});
            }
            if (response[0].rightColumn) {
                this.setState({rightColumn: response[0].rightColumn});
            }
        } catch {
            console.log("error");
        }
    }

    mapRichText = (textBlocks) => {
        const string = blocksToHtml({
            blocks: textBlocks
        });
        return parse(string);
    }

    render() {
        const left = this.state.leftColumn.length > 0;
        const right = this.state.rightColumn.length > 0;
        let aboutContent = [];
        if (left) {
            aboutContent.push(<div className="aboutLeft">{this.mapRichText(this.state.leftColumn)}</div>);
        }
        if (right) {
            aboutContent.push(<div className="aboutRight">{this.mapRichText(this.state.rightColumn)}</div>);
        }

        return (
            <div className="about">
                {aboutContent}
            </div>
        )
    }
}

export default About;