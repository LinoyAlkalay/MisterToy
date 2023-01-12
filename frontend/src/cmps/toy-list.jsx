import { Link } from "react-router-dom"

import { ToyPreview } from "./toy-preview"

export function ToyList({ toys, onRemoveToy }) {

    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <div className="img-container">
                    <img src={require(`../assets/imgs/${toy.name}.jpg`)} alt=""/>
                </div>
                <div className="toy-preview-content">
                    <ToyPreview toy={toy} />
                    <button onClick={() => { onRemoveToy(toy._id) }}
                        className="fa-regular trash-can" title="delete"></button>
                    <Link to={`/toy/edit/${toy._id}`} className="fa-regular pen-to-sgure"
                        title="edit"></Link>
                </div>
            </li>
        )}
    </ul>
}