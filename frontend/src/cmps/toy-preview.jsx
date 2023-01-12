import { Link } from "react-router-dom"


export function ToyPreview({ toy }) {

    return <p>
        <Link to={`/toy/${toy._id}`} title="details"><span>{toy.name}</span></Link>
        <span>${toy.price}</span>
    </p>
}