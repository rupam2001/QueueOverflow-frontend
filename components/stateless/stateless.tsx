import React from 'react';
import css from "csstype"
interface propType {
    text: string,
    onclickCallBack: Function,
    buttonStyle?: css.Properties

}

const Button = (props: propType) => (
    <div className="button" onClick={() => { props.onclickCallBack() }} style={props.buttonStyle}>
        <span>{props.text}</span>
    </div>
)


export { Button }