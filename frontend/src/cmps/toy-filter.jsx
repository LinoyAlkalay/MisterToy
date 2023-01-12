import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const debounceFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        debounceFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        ev.preventDefault()
        let { value, name: field, type } = ev.target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onToggleInStock() {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, inStock: !prevFilter.inStock }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toy-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                name="name"
                placeholder="search by name"
                value={filterByToEdit.name}
                onChange={handleChange}
            />
            <input type="number"
                name="price"
                placeholder="search by max price"
                onChange={handleChange}
            />
            <input name="inStock" type="checkbox" onChange={() => { onToggleInStock() }} />
            <label htmlFor="inStock" >In stock</label>
        </form>
    </section>
}