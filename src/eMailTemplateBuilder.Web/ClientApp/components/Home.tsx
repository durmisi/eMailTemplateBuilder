import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { NavLink } from 'react-router-dom';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div style={{ padding: 100 }}>

                <NavLink to="/designer" className="btn btn-default">
                    Open Designer
                   </NavLink>
            </div>
        );
    }
}
