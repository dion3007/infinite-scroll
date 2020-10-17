import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}


const BookList = ({ bookData }) => {
    const books = bookData.results || []
    const [bookList, setBooks] = useState(books)
    const prevData = usePrevious(bookData.results)
    const router = useRouter()
    useEffect(() => {
        if (bookData.results.length !== 0) {
            if (bookData.error) {
            } else if (prevData !== bookData.results && prevData !== undefined) {
                books.unshift(...prevData)
                setBooks(books)
            }
        }
    }, [bookData])
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
    const handleScroll = () => {
        const lastUserLoaded = document.querySelector(
            ".book-list > .book:last-child"
        )
        const query = router.query
        const curPage = query.page;
        const maxPage = Math.ceil(bookData.num_results / 20);
        if (lastUserLoaded) {
            const lastUserLoadedOffset =
                lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            if (pageOffset === lastUserLoadedOffset + 48) {
                if (curPage < maxPage) {
                    query.page = parseInt(curPage) + 20
                    router.push({
                        pathname: router.pathname,
                        query: query,
                    })
                }
            }
        }
    }
    return (
        <>
            <Grid container spacing={3} className="book-list">
                {bookList.length > 0 &&
                    bookList.map((res, i) => {
                        return (
                            <Grid item className="book" key={i}>
                                <Grid container spacing={0}>
                                    <Grid item>
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="140"
                                                    image="https://bodybigsize.b-cdn.net/wp-content/uploads/2020/02/noimage.png"
                                                    title="Contemplative Reptile"
                                                />
                                                <Typography variant="body2" color="textSecondary" component="p" className="publisher">
                                                    {res.publisher || "unknown"}
                                                </Typography>
                                            </CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="body2" component="p" className="elipsisText">
                                                        {res.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p" className="elipsisText">
                                                        {res.contributor || "by unknown"}
                                                    </Typography>
                                                </CardContent>
                                            <CardActions className="cardAction">
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {res.price === 0 ? "Free" : `$ ${res.price}`}
                                                </Typography>
                                                <Button size="small">
                                                    <FavoriteBorderIcon />
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}
export default BookList