export default function BlogIndex() {
    return <div>
        <h3>Hello, blog index!</h3>
        <ul>
            <li><a href={'/blog/' + Math.random()} >Random Post</a></li>
        </ul>
    </div>
}