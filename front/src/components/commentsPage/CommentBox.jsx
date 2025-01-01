import React from 'react'
import styles from './CommentBox.module.scss';
import axiosInstance from '/src/api/axios';
import useUserStore from '/src/store/userStore';

function CommentBox({ data, fetchComments }) {
  const user = useUserStore((state) => state.user); 
  const handleDeleteComment = async () => {
    try {
      const username = user?.nickname;
      const commentId = data.id;
      const res = await axiosInstance.delete(`/comment/comment?username=${username}&commentId=${commentId}`);
      if (res.status === 200) {
        alert('댓글이 삭제되었습니다.');
        fetchComments();
    }
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생: ', error);
    }
  }
  return (
    <div className={styles.boxWrapper}>
      <div className={styles.profileWrapper}>
        <img className={styles.profilePic} src={data?.profile_image} />
      </div>
      <div className={styles.commentWrapper}>
        <h3 className={styles.username}>{data.username}</h3>
        <p className={styles.content}>{data.content}</p>
        <span className={styles.detailBox}><p className={styles.date}>{data.createdAt}</p><p className={styles.delete} onClick={handleDeleteComment}>삭제</p></span>
      </div>

    </div>
  )
}

export default CommentBox