import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useModalStore = create(
    devtools(
        (set) => ({
            modals: {}, // 열린 모달들을 관리
            openModal: (id, props) =>
                set((state) => ({
                    modals: { ...state.modals, [id]: props },
                })),
            closeModal: (id) =>
                set((state) => {
                    const newModals = { ...state.modals };
                    delete newModals[id];
                    return { modals: newModals };
                }),
        })));

export default useModalStore;