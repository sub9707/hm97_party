import React, { useState } from 'react';
import axiosInstance from '/src/api/axios';
import styles from './CommentInput.module.scss';
import useUserStore from '/src/store/userStore';

function CommentInput({ fetchComments }) {
    const [comment, setComment] = useState('');
    const user = useUserStore((state) => state.user); 
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }
        if(!user){
            alert('올바르지 않은 접근입니다. 다시 로그인해 주세요.');
            return;
        }

        try {
            const response = await axiosInstance.post('/comment/comment', {
                username: user?.nickname,
                content: comment,
            });

            if (response.status === 200) {
                alert('댓글이 등록되었습니다.');
                setComment('');
                fetchComments();
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('댓글 등록에 실패했습니다.');
        }
    };

    return (
        <div className={styles.inputBox}>
            <div className={styles.profileWrapper}>
                <img className={styles.profilePic} src={user?.profile_image} alt='profile_image' />
            </div>
            <div className={styles.inputArea}>
                <p className={styles.username}>{user?.nickname}</p>
                <div className={styles.inputContainer}>
                    <textarea
                        className={styles.textInput}
                        placeholder='댓글을 입력해주세요..'
                        value={comment}
                        onChange={handleCommentChange}
                        maxLength={10000}
                    />
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default CommentInput;
