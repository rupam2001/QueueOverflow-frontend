import React, { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'




const link = props => {
    return (
        <a href={props.href} target="_blank" style={{ color: "blue", }}>{props.children}</a>
    )
}



interface propType {
    markdownText: string,
    disablePopups?: boolean
}

export default function MarkDown(props: propType) {

    const [fullSize, setFullSize] = useState(false);
    const MyImage = _props => {
        const handleClick = () => {
            if (props.disablePopups) return;
            setFullSize(!fullSize);
        };

        return (
            <div className={fullSize ? "md-large-box" : "md-img-box"}>

                <div>

                    {fullSize && <p>{_props.alt}</p>}
                    {
                        _props.src.includes("youtube") ?
                            (<iframe width="560" height="315" src={_props.src} className="md-img-box" allowFullScreen></iframe>) :
                            (<img
                                className={fullSize ? "md-large md-img" : "md-small md-img"}
                                alt={_props.alt}
                                src={_props.src}
                                onClick={handleClick}
                                width="560"
                                height="auto"
                            />)
                    }
                </div>
            </div>
        );
    };
    const renderers = {
        image: MyImage,
        link: link,
        code: ({ language, value }) => {
            return (
                <div className="md-code">
                    <SyntaxHighlighter language={language} children={value} />
                </div>
            )
        }
    };
    return (
        <ReactMarkdown plugins={[gfm]} children={props.markdownText} renderers={renderers} />
    )
}