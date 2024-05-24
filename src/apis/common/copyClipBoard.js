import toast from 'react-hot-toast';

export const handleCopyClipBoard = async () => {

    try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('클립보드에 복사되었습니다.!');
    } catch (error) {
        toast.error('클립보드에 복사실패.!');
    }
}