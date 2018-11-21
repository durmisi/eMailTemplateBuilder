import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
require('codemirror/mode/javascript/javascript');

type JsonEditorProps = {
    Json: string
}

export default class JsonEditor extends React.Component<JsonEditorProps, {}> {
    instance: IInstance | null;
    constructor(props: JsonEditorProps) {
        super(props);
        this.instance = null;
    }

    componentWillReceiveProps() {
        let self = this;
        setTimeout(function () {
            if (self.instance != null)
                self.instance.refresh();
        }, 1);
    }

    public render() {
        return (
            <div className="editor">
                <CodeMirror
                    editorDidMount={editor => { this.instance = editor }}
                    value={this.props.Json}
                    options={{
                        mode: 'javascript',
                        theme: 'eclipse',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {
                    }}
                />
            </div>
        );
    }
}
