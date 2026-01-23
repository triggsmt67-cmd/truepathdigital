const WP_ENDPOINT =
  import.meta.env.VITE_WP_GRAPHQL_ENDPOINT ||
  import.meta.env.VITE_WORDPRESS_API_URL ||
  'https://admin.truepath406.com/graphql';

export async function wpQuery<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  try {
    const response = await fetch(WP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await response.json();

    if (json.errors) {
      // Improved logging: stringify the errors array for better debugging
      console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      throw new Error(`GraphQL Error: ${json.errors[0].message}`);
    }

    return json.data as T;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}
