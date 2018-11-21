import * as React from 'react';

import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/clike/clike');


type CSharpCodeEditorProps = {
    CSharpCode: string
    onChange: (code: string) => void;
}

export default class CSharpCodeEditor extends React.Component<CSharpCodeEditorProps, {}> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { onChange } = this.props;
        return (
            <div className="editor">
                <CodeMirror
                    value={this.props.CSharpCode}
                    options={{
                        mode: 'clike',
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
