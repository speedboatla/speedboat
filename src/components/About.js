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
        this.getTeamMembers();
    }

    state = {
        aboutContent: [],
        teamMembers: [],
    }

    getAboutContent = async () => {
        const query = '*[_type == "about"]{...}';
        try {
            const response = await client.fetch(query);
            console.log(response);
            this.setState({
                aboutContent: response[0].content
            });
        } catch {
            console.log("error");
        }
    }

    getTeamMembers = async () => {
        const query = '*[_type == "teamMember"]{...}';
        try {
            const response = await client.fetch(query);
            this.setState({
                teamMembers: response
            });
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

    mapTeamMembers = (teamMembers) => {
        return teamMembers.map( teamMember => {
            return (
                <p key={teamMember.bio}>
                    <strong>{teamMember.firstName} {teamMember.lastName}</strong> {teamMember.bio}
                </p>
            )
        });
    }

    render() {
        return (
            <div className="about">
                <div className="aboutContent">{this.mapRichText(this.state.aboutContent)}</div>
                <div className="teamMembers">
                    <h2>Team Members</h2>
                    {this.mapTeamMembers(this.state.teamMembers)}
                </div>
            </div>
        )
    }
}

export default About;