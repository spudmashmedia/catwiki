export default function NavigationBar() {
    return <nav>
        <div className="flex flex-row place-content-center items-center bg-black rounded-b-lg h-16 text-4xl font-extrabold text-white">
            <a href="/" className="w-40 text-center">Home</a>
            <a href="/about" className="w-40 text-center">About</a>
        </div>
    </nav>
}