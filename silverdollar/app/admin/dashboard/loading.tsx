export default function loading() {
    return (
        <div className='h-screen container min-h-screen flex justify-center items-center'>
            <div 
                className={`h-12 w-12 border-4 animate-spin rounded-full border-solid border-gray-600 border-t-transparent`}
            />
        </div>
    )
}