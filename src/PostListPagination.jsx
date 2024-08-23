import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from "axios"


const fetchPosts = async (page, limit) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    return response.data;
}



const PostListPagination = () => {
    
    const queryClient = useQueryClient();
    
    useEffect(() => {
        queryClient.invalidateQueries(['posts']);
    }, []);
    
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: [ "posts", page ],
        queryFn: () => fetchPosts( page, limit),
        keepPreviousData: true,
    })

    if ( isLoading ){return <div>Loading...</div>}
    if ( isError ){return <div>{error.message}</div>}

    if (!Array.isArray(posts)){
        return <div>Error: Posts is not an array</div>
    }

    return(
        <div>
            <h1>Posts Pagination</h1>
            <ol>
                {posts.map( ( post ) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ol>
            <div>
                <button onClick={() => setPage((old) => Math.max(old -1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage((old) => (posts.length < limit ? old : old +1))} disabled={posts.length < limit}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default PostListPagination