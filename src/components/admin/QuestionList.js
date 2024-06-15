import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {fetchDialogs} from "../../http/adminAPI";
import DialogItem from "./DialogItem";

const QuestionList = () => {
    const {admin} = useContext(Context)

    useEffect(() => {
        fetchDialogs().then(data => admin.setDialogs(data))
    }, [])

    return (
        <div className='question__container'>
            {/*{admin.questions.map(item =>*/}
            {/*    <QuestionItem key={item.id} question={item} visible={visible} setVisible={setVisible} />*/}
            {/*)}*/}
            {admin.dialogs.map(item =>
                <DialogItem key={item.id} chat={item} />
            )}
        </div>
    );
};

export default QuestionList;