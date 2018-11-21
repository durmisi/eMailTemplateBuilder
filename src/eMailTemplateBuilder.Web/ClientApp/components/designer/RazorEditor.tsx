import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
require('codemirror/mode/htmlmixed/htmlmixed');


type RazorEditorProps = {
    Template: string;
    onChange: (template: string) => void;
}

export default class RazorEditor extends React.Component<RazorEditorProps, {}> {
    instance: IInstance | null;
    constructor(props: RazorEditorProps) {
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
        const { onChange } = this.props;
        return (
            <div className="editor">
                <CodeMirror
                   editorDidMount={editor => { this.instance = editor }}
                   value={this.props.Template}
                    options={{
                        mode: 'htmlmixed',
                        theme: 'eclipse',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {
                        onChange(value);
                    }}
                />
            </div>
        );
    }
}
