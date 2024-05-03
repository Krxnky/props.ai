export default function Loading() {
    return (
        <dialog
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-100 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </dialog>
    )
}