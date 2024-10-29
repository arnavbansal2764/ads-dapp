import { create } from 'zustand';

interface CreateAdSpace {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateAdSpace = create<CreateAdSpace>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

}));

export default useCreateAdSpace;