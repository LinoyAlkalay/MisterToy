import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { loadReviews, addReview, removeReview } from '../store/actions/review.action'

export function Review({ toyId }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId })

    console.log('reviews:', reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
    }

    return (
        <div className="review-app">
            <span>Reviews</span>
            {reviews && <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <div>{review.txt}</div>
                        <div>
                            By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>}
            {loggedInUser &&
                <form onSubmit={onAddReview}>
                    <textarea
                        name="txt"
                        onChange={handleChange}
                        value={reviewToEdit.txt}
                    ></textarea>
                    <button>Add</button>
                </form>}
        </div>
    )
}