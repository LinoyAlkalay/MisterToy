import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadToys, removeToy } from '../store/actions/toy.action'
import { SET_FILTER, SET_SORT } from '../store/reducers/toy.reducer'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { ToySort } from '../cmps/toy-sort'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    // const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    const [sortBy, setSort] = useState(toyService.getDefaultSort())

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    async function onLoadToys(filterBy, sortBy) {
        try {
            await loadToys(filterBy, sortBy)
        } catch (err) {
            showErrorMsg('Cannot load cars', err)
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy', err)
        }
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function onSetSort(sortBy) {
        // dispatch({ type: SET_SORT, sortBy })
        setSort(sortBy)
    }

    return <section className="toy-index">
        <main className="main-toy-index">
            <div className="filter-sort-container">
                <ToyFilter onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </div>
            <Link to={`/toy/edit`} title="edit">add toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </main>
    </section>
}

