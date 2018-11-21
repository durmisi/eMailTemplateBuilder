import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';


type TemplateViewerProps = {
    Html: string
}

export default class TemplateViewer extends React.Component<TemplateViewerProps, {}> {

    createMarkup = () => {
        return { __html: this.props.Html };
    }

    public render() {
        return (
            <div className="preview-box">
                <div dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div>
        );
    }
}
