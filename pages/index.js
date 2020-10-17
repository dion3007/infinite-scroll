import fetch from "node-fetch"
import BookList from "../components/BookList"
const HomePage = ({ bookData }) => {
  return (
    <div className="home-page">
      <BookList bookData={bookData} />
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  const page = query.page || 0
  let bookData = null
  try {
    const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=unTguhcesWRD72ngj1WN5cm9NYpvHJWA&offset=${page}`)
    if (res.status !== 200) {
      throw new Error("Failed to fetch")
    }
    bookData = await res.json()
  } catch (err) {
    bookData = { error: { message: err.message } }
  }
  // Pass data to the page via props
  return { props: { bookData } }
}
export default HomePage