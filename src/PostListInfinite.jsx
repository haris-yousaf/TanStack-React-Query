import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ pageParam = 1}) => {
    const limit = 10;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`)
    return { data: response.data, nextPage: pageParam + 1}
}

const PostListInfinite = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["postsInfinite"],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.data.length ? lastPage.nextPage : undefined;
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>

    return (
        <div>
            <h1>Post List Infinite</h1>
            <ol>
                {data.pages.map((page) => page.data.map((post) => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                )))}
            </ol>
            <div>
            <button onClick={() => fetchNextPage()} disabled={ !hasNextPage || isFetchingNextPage }>
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "No More Posts" }
            </button>
            </div>
        </div>
    )
}

export default PostListInfinite;