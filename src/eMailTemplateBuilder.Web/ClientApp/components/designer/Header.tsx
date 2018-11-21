import * as React from 'react';

export interface HeaderProps {
    children?: React.ReactNode;
}

export default class Header extends React.Component<HeaderProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">NGXSoft Email System</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        {this.props.children}
                    </div>
                </nav>
            </header>
        );
    }
}
