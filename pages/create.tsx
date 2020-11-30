import { useState } from 'react'
import Editor from '../components/editor'
import MarkDown from '../components/markdown'
import NavBar from '../components/navbar'
import { Button } from '../components/stateless/stateless'


export default function Create() {

    const [markdownText, setMarkdownText] = useState('')
    const [title, setTitle] = useState('')

    return (
        <div>
            <NavBar />
            <div style={{ marginTop: '1rem' }} className="cr-main">
                <div className="cr-left">
                    <div className="cr-left-editor">

                        <div className="cr-title">
                            <input placeholder="Title" onChange={(e) => { setTitle("## " + e.target.value) }} />
                        </div>
                        <Editor
                            onChangeCallBack={(text) => { setMarkdownText(text) }}
                            onChangeImageCallBack={() => { }}
                            containerStyle={{ border: '1px solid gray', height: '25rem' }}
                            textAreaPlaceholder={"Type your question body here"}
                        />
                        <div className="cr-ed-btns">
                            <Button onclickCallBack={() => { }} text="Post question" />
                            <Button onclickCallBack={() => { }} text="Save as draft in this device" buttonStyle={{ backgroundColor: 'transparent', color: 'red', marginLeft: '1rem' }} />
                        </div>
                    </div>
                </div>
                <div className="cr-right">
                    <div>
                        <p>Preview (scaled down)</p>
                        <div className="cr-preview">
                            <MarkDown markdownText={title + "\n" + markdownText} disablePopups={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


