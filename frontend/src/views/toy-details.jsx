import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Review } from "../cmps/review"

import { showErrorMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <img src={require(`../assets/imgs/${toy.name}.jpg`)} />
        <div className="toy-details-content">
            <p>
                <span>{toy.name}</span>
                <span>${toy.price}</span>
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Review toyId={toy._id} />
            <Link to={`/toy`} className="fa-solid arrow-left"></Link>
        </div>
    </section>
}