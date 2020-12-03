
import React, { useState } from 'react';

interface propTypes {
    onClickTagsCallBack: Function,
}


export default function Tags(props: propTypes) {

    const [tagData, setTagData] = useState<Array<string>>(sample)
    const [tagDataBackups, setTagDataBackups] = useState<Array<string>>(sample)

    const [selectedTags, setSelectedTags] = useState({})

    const handleTagSelect = (tag) => {
        let previousSeletedTags = { ...selectedTags }
        if (previousSeletedTags.hasOwnProperty(tag)) {
            //remove
            delete previousSeletedTags[tag]
        } else {
            //add
            previousSeletedTags[tag] = true
        }
        setSelectedTags(previousSeletedTags)
        let selectedTagsArray = []
        for (const [key, value] of Object.entries(previousSeletedTags)) {
            selectedTagsArray.push(key)
        }
        props.onClickTagsCallBack(selectedTagsArray)
    }
    const onChangeSearch = (e) => {
        if (e.target.value.length == 0) {
            setTagData(tagDataBackups);
        } else {
            let filteredTags = tagDataBackups.filter(tg => tg.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
            setTagData(filteredTags)
        }
    }

    return (
        <div>
            <div className="tag-header">
                <h3>Select tags <span>({Object.getOwnPropertyNames(selectedTags).length})</span></h3>
                <input placeholder="Search tags" onChange={onChangeSearch} />
            </div>
            <div className="tag-main" >

                {
                    tagData.map(each => (
                        <div className={selectedTags.hasOwnProperty(each) ? "tag-each tag-selected" : "tag-each"} onClick={() => { handleTagSelect(each) }}>
                            {each}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const sample = [
    "programming", "web", "react", "javascript", "golang", "os",
    "C", "Rust", "C++", "Java", "Python", "Html", "Css", "Scss",
    "programming", "web", "react", "javascript", "golang", "os",
    "C", "Rust", "C++", "Java", "Python", "Html", "Css", "Scss",
    "C", "Rust", "C++", "Java", "Python", "Html", "Css", "Scss",
    "programming", "web", "react", "javascript", "golang", "os",
    "C", "Rust", "C++", "Java", "Python", "Html", "Css", "Scss"
]