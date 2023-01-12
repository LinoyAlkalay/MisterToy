import React from 'react'

export function ToySort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleDirectionChange() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <button onClick={() => handleSortChange('name')}>name</button>
        <button onClick={() => handleSortChange('price')}>price</button>
        <button onClick={handleDirectionChange} className={sortBy.asc ? 'fa-solid sort-up' : 'fa-solid sort-down'}></button>
    </section>
}