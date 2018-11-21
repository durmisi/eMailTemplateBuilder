import './designer/designer.css';

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from './designer/Header';

import CSharpCodeEditor from './designer/CSharpCodeEditor';
import RazorEditor from './designer/RazorEditor';
import JsonEditor from './designer/JsonEditor';
import TemplateViewer from './designer/TemplateViewer';
import LogViewer from './designer/LogViewer';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as classNames from 'classnames';


type DesignerState = {
    activeTab: string,
    model: {
        Name: string,
        Code: string,
        TemplateModel: string,
        Json: string,
        Template: string,
    },
    Html:string
}


export class Designer extends React.Component<RouteComponentProps<{}>, DesignerState> {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            model: {
                Name: 'New Template',
                Code: 'using System;\r\nusing System.Collections.Generic;\r\n\r\nnamespace EmailModels\r\n{\r\n\tpublic class EmailModel\r\n\t{\r\n\t\tpublic string Name { get; set; }\r\n\t\t\r\n\t}\r\n}',
                Template: '@model EmailModels.EmailModel\r\n\r\n<html>\r\n<body>\r\n    <p>\r\n        Your name is: \r\n    <\/p>\r\n    \r\n\t@Model.Name\r\n\t\r\n<\/body>\r\n<\/html>',
                TemplateModel:'EmailModels.EmailModel',
                Json: '{\r\n  \"name\": \"Name\"\r\n}',
            },
            Html: ''
        };

        this.onRunClick = this.onRunClick.bind(this);
    }

    toggle(tab: string) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onRunClick: any = () => {

        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');


        fetch("/api/templates/build",
            {
                method: 'post',
                headers: headers,
                body: JSON.stringify(
                    this.state.model
                )
            })
           .then(
                (response) => {
                     response.text()
                         .then(text => {
                             console.log(text);
                            this.setState({ Html: text });
                        });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    debugger;
                }
            )
    };

    public render() {
        return (
            <div>
                <Header>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Designer</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Admir Durmishi
                    </span>
                </Header>

                <div id="main-content" className="row">
                    <div className="col-sm-6">

                        <Card>
                            <CardBody>
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="templateName" className="mr-sm-2">Template Name: </Label>
                                        <Input type="text" name="templateName" id="templateName" value={this.state.model.Name} />
                                    </FormGroup>
                                    <Button color="success" onClick={this.onRunClick} >Run</Button>
                                </Form>
                            </CardBody>
                        </Card>

                        <br />

                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classNames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
                                    Model
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classNames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}>
                                    Template
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classNames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}>
                                    Data
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <div className="editorContainer">
                                            <CSharpCodeEditor CSharpCode={this.state.model.Code} />
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <div className="editorContainer">

                                            <Form>
                                                <FormGroup>
                                                    {/* <Label for="ddlModel">Model</Label> */}
                                                    <Input type="select" name="select" id="ddlModel">
                                                        <option>EmailModels.EmailModel</option>
                                                    </Input>
                                                </FormGroup>

                                                <RazorEditor Template={this.state.model.Template} />

                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <div className="editorContainer">
                                            <JsonEditor Json={this.state.model.Json} />
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                    <div className="col-sm-6">
                        <Nav tabs>
                            <NavItem>
                                <NavLink>
                                    Preview
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab="html-preview-tab">
                            <TabPane tabId="html-preview-tab">
                                <Row>
                                    <Col sm="12">
                                        <div className="editorContainer">
                                            <TemplateViewer Html={this.state.Html} />
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>

                {/* <LogViewer /> */}
            </div>
        );
    }
}
