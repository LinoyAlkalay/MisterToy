import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { saveToy } from "../store/actions/toy.action"

import { toyService } from "../services/toy.service"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()

        try {
            await saveToy(toyToEdit)
        } catch (err) {
            console.log('cannot save toy:', err)
        } finally {
            navigate('/toy')
        }
    }

    return <section className="toy-edit main-layout">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Toy name: </label>
            <input type="text"
                name="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price: </label>
            <input type="number"
                name="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}