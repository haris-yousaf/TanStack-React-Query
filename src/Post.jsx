import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getPost } from "./api/posts"
import { getUser } from "./api/users"
import { useEffect } from "react"

export default function Post({ id }) {

  const queryClient = useQueryClient();
    
    useEffect(() => {
        queryClient.invalidateQueries(['posts']);
    }, []);
  

  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  })

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  })

  if (postQuery.status === "loading") return <h1>Loading...</h1>
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>
  }

  return (
    <>
      <h1>{postQuery.data.title}</h1>
      <p>{postQuery.data.body}</p>
    </>
  )
}