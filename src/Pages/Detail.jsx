import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import {
  BASE_POSTER_PATH,
  BASE_MOVIE_PATH,
  baseURL,
  BASE_LANGUAGE_URL_PATH,
} from "../services/util/utility"
import PageNotFound from "../PageNotFound"
import Loader from "../components/Error/Loader"
import Error from "../components/Error/Error"

export default function Detail(props) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(
          `${BASE_MOVIE_PATH}${id}?api_key=${baseURL}${BASE_LANGUAGE_URL_PATH}`
        )
        if (res.ok) {
          const json = await res.json()
          setData(json)
        } else {
          throw res
        }
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [id])

  if (loading) return <Loader />
  if (error) return <Error />
  if (data.length === 0) return <PageNotFound />
  return (
    <div className="container mt-4 d-flex">
      <img
        style={{ maxWidth: "450px" }}
        src={`${BASE_POSTER_PATH}/w500${data.poster_path}`}
        alt={data.original_title}
      />
      <div className="ml-4">
        <h2 className="text-primary">{data.title}</h2>
        <strong>Overview</strong>
        <p className="lead">{data.overview}</p>
        <strong>Release:</strong>
        <p className="lead">{data.release_date}</p>
        <div className="d-block">
          <button
            type="button"
            className="btn btn-outline-success text-white"
            onClick={() => {
              props.addToCart(id)
              history.push("/cart")
            }}
          >
            Add To Cart
          </button>
          <strong className="ml-2 text-white">$0.00</strong>
        </div>
      </div>
    </div>
  )
}
