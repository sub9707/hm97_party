import React, { useState, useEffect } from 'react';
import FullPageLayout from '../FullPageLayout';
import styles from './page.module.scss';
import CommentBox from '../../components/commentsPage/CommentBox';
import CommentInput from '../../components/commentsPage/CommentInput';
import axiosInstance from '/src/api/axios';
import CommentBanner from '../../components/commentsPage/CommentBanner';

import boardBottom from '/src/assets/images/board/boardBottom.png';
import backpack from '/src/assets/images/board/backpack.png';
import idea from '/src/assets/images/board/idea.png';
import notebook from '/src/assets/images/board/notebook.png';
import pens from '/src/assets/images/board/pens.png';

function Page() {
    const [commentsData, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const fetchComments = async () => {
        try {
            setIsLoading(true); // 로딩 시작
            const res = await axiosInstance.get('/comment/comments');
            setComments(res.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <FullPageLayout>
            <div className={styles.background} />
            <div className={styles.commentsContainer}>
                <CommentBanner />
                <CommentInput fetchComments={fetchComments} />
                <div className={styles.commentsBox}>
                    {isLoading ? (
                        <p className={styles.loadText}>댓글 불러오는 중...</p>
                    ) : (
                        commentsData.map((data, _idx) => (
                            <CommentBox key={_idx} data={data} fetchComments={fetchComments} />
                        ))
                    )}
                </div>
            </div>
            <img className={styles.boardBottom} src={boardBottom} alt='boardBottom' />
            <img className={styles.backpack} src={backpack} alt='backpack' />
            <img className={styles.idea} src={idea} alt='idea' />
            <img className={styles.notebook} src={notebook} alt='notebook' />
            <img className={styles.pens} src={pens} alt='pens' />
        </FullPageLayout>
    );
}

export default Page;
