import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface NavMenuProps {

}

export default class NavMenu extends React.Component<NavMenuProps, {}> {
    public render() {
        return (
            <ul className="nav navbar-nav">
                <li id="btnRun"><a href=""><span className="glyphicon glyphicon-play" aria-hidden="true"></span> Run</a></li>
                <li id="btnTidyUp"><a href=""><span className="glyphicon glyphicon-save" aria-hidden="true"></span> Save</a></li>
            </ul>
        );
    }
}
