import React, { useState, useEffect, useRef } from 'react';
import { Button } from './stateless/stateless';

interface propType {
    visible: boolean,
    reload?: boolean,
    onDraftSelectCallback?: Function
}
interface draftType {
    name: string,
    title: string,
    body: string,
    time: string
}

const DraftPanle = (props: propType) => {

    const panelRef = useRef(null)
    const [drafts, setDrafts] = useState<Array<draftType>>([])



    const loadFromLocalDraft = () => {
        let d = getDrafts({})
        setDrafts(d)
    }

    const panelVisiblity = (visible) => {
        panelRef.current.style.display = visible ? "flex" : "none"
    }

    useEffect(() => {
        panelVisiblity(props.visible)
    }, [props.visible])
    useEffect(() => {
        loadFromLocalDraft()
    }, [props.reload])

    const deletModalRef = useRef(null)

    const handleDelete = (name: string) => {

        deleteDraft(name)
        loadFromLocalDraft()
    }

    const ModalDelete = ({ title }) => (
        <div className="ed-modal" ref={deletModalRef} style={{}}>
            <div className="ed-main">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => { deletModalRef.current.style.display = 'none' }}></i>
                </div>
                <p>{title}</p>
                <div className="ed-btns">
                    <div>
                        <Button text="Confirm" onclickCallBack={() => { handleDelete() }} />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="cr-draft-panel" ref={panelRef}>
            <div className="cr-draft-panel-head">
                <span>Drafts</span>
                <i className="fa fa-times" aria-hidden="true" onClick={() => { panelVisiblity(false) }}></i>
            </div>
            <div className="cr-draft-panel-body">
                {drafts.map((each) => (
                    <div className="cr-draft-each cr-draft-slider-delete" onClick={(e) => { if (e.target.id === 'del') return; props.onDraftSelectCallback(each) }}>
                        <p >
                            {each.name.slice(0, 20)}
                        </p>
                        <i className="fa fa-times" aria-hidden="true" id="del" onClick={() => { handleDelete(each.name) }}></i>
                    </div>
                ))}
                {
                    drafts.length == 0 && <p>No drafts found</p>
                }
            </div>
            {ModalDelete({ title: "Are you sure?" })}
        </div>
    )
}
export default DraftPanle;

const getDrafts = (args: { name?: string, callback?: Function }): Array<draftType> => {
    let drafts: Array<draftType> = JSON.parse(localStorage.getItem("drafts"))
    if (!args.name && !args.callback) return drafts ? drafts : []
    let filterdDrafts: Array<draftType>
    if (args.name) {
        filterdDrafts = drafts.filter((d) => d.name == args.name)
    }
    if (args.callback) {
        filterdDrafts = drafts.filter((d) => args.callback(d))
    }

    return filterdDrafts ? filterdDrafts : []
}


const saveDraft = (draft: draftType): { sucess: boolean, msg: string } => {
    let isTitleExist = getDrafts({ name: draft.name }).length
    if (isTitleExist) {

        return { sucess: false, msg: "Name already exist" }
    }
    let preDrafts = JSON.parse(localStorage.getItem("drafts"))
    let newDratfs: Array<draftType>
    if (preDrafts) {
        newDratfs = [draft, ...preDrafts]
    } else {
        newDratfs = [draft]
    }
    localStorage.setItem("drafts", JSON.stringify(newDratfs))
    return { sucess: true, msg: "Saved!" }
}


const deleteDraft = (name: string) => {
    let allDrafts = getDrafts({})
    let filteredDrafts = allDrafts.filter(d => d.name !== name)
    localStorage.setItem("drafts", JSON.stringify(filteredDrafts))
}

const updateDraft = (draft: draftType): { success: boolean, msg: string } => {
    deleteDraft(draft.name)
    saveDraft(draft)
    return { success: true, msg: "Updated" }
}

export { saveDraft, getDrafts, updateDraft, deleteDraft }



