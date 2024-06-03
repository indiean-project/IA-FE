import toast from 'react-hot-toast';

export const handleCopyClipBoard = () => {
    
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href)
          toast.success("클립보드에 복사되셨습니다.")
        } else {
          const textArea = document.createElement('textarea')
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          toast.success("클립보드에 복사되셨습니다.")
        }
      
}