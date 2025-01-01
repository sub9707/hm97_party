import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserStore = create(
  devtools(
    (set) => ({
        user: null,
        setUser: (userData) => set({ user: userData }),
    }),
    { name: 'UserStore' } // 디버깅 시 스토어 이름으로 표시
  )
);

export default useUserStore;
