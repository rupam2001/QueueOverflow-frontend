import React from 'react';
import css from "csstype"
interface propType {
    text: string,
    onclickCallBack: Function,
    buttonStyle?: css.Properties,
    disable?: boolean

}

const Button = (props: propType) => (
    <div className={props.disable ? "button button-disable" : "button"} onClick={() => { if (!props.disable) props.onclickCallBack() }} style={props.buttonStyle}>
        <span>{props.text}</span>
    </div>
)


export { Button }