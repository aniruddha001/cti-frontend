// lib/graphql/client.ts

interface GraphQLResponse<T> {
  data: T
  errors?: { message: string }[]
}

export async function wpGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 3600  // ← number only
): Promise<T> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate }  // ← just number
    })

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const json: GraphQLResponse<T> = await res.json()
    if (json.errors) throw new Error(json.errors[0].message)

    return json.data

  } catch (error) {
    console.error('GraphQL Error:', error)
    throw error
  }
}