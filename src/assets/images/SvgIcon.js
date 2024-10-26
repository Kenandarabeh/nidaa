import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = {
 email :`
 <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px"  viewBox="0 -2.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>email [#1572]</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -922.000000)" fill="#000000">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M294,774.474 L284,765.649 L284,777 L304,777 L304,765.649 L294,774.474 Z M294.001,771.812 L284,762.981 L284,762 L304,762 L304,762.981 L294.001,771.812 Z" id="email-[#1572]">

</path>
            </g>
        </g>
    </g>
</svg>
 `
 ,logo :`
 <svg width="79" 
 xmlns="http://www.w3.org/2000/svg" 
 height="34" id="screenshot-9d4c2781-a70e-8011-8005-2604ec96f005" 
 viewBox="0 0 79 34" xmlns:xlink="http://www.w3.org/1999/xlink" 
 fill="none" version="1.1">
 <g id="shape-9d4c2781-a70e-8011-8005-2604ec96f005" 
 data-testid="signal-2024-10-20-085023_002"><defs>
 <pattern patternUnits="userSpaceOnUse" x="0" y="0" width="79" height="34" id="fill-0-render-1">
 <g><image id="fill-image-render-1-0" 
 href="http://penpot-frontend/assets/by-file-media-id/0c09f26a-18b3-8157-8005-2602b2e8a9f4" 
 preserveAspectRatio="xMidYMid slice" width="79" height="34" opacity="1"/>
 </g></pattern></defs>
 <g class="fills" id="fills-9d4c2781-a70e-8011-8005-2604ec96f005"><rect rx="0" ry="0" x="0" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" 
 width="79" height="34" fill="url(#fill-0-render-1)"/></g></g></svg>`
 ,back:`
 <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z" fill="#5C5F62"/></svg>
 `
};

export default class SvgIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.icon,
      height: this.props.height,
      width: this.props.width,
      fill: this.props.fill || '#000', // Default to black if no fill prop is passed
      marginRight: this.props.marginRight,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      icon: nextProps.icon,
      height: nextProps.height,
      width: nextProps.width,
      fill: nextProps.fill || '#000',
      marginRight: nextProps.marginRight,
    });
  }

  render() {
    const iconXml = icon[this.state.icon].replace(/fill="#[0-9A-Fa-f]{3,6}"/, `fill="${this.state.fill}"`);
    return (
      <SvgXml
        width={this.state.width}
        height={this.state.height}
        xml={iconXml}
        style={{ marginRight: this.state.marginRight }}
      />
    );
  }
}
