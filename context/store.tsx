import React, { useState } from 'react';
const Store = React.createContext(null)


export default function StoreProvider(props) {


    return (
        <Store.Provider
            value={{
            }}
        >
            {props.children}
        </Store.Provider>
    )
}