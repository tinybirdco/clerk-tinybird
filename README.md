# Clerk + Tinybird JWT template

This is a template for a Next.js app that uses [Clerk](https://clerk.com/) for authentication and multi-tenant [Tinybird](https://tinybird.co/) real-time analytics applications.

## Getting Started

1. Create a new Clerk application
2. Create a new Tinybird workspace
3. Create an `.env` file from the `.env.example` file and fill in the values
4. Run `npm install`
5. Run `npm run dev`

In Clerk (Dashboard > Configure > JWT templates) create a `tinybird` JWT template with these claims:

```
{
	"name": "frontend_jwt",
	"limits": {
		"rps": 10
	},
	"scopes": [
		{
			"type": "PIPES:READ",
			"resource": "<YOUR-TINYBIRD-PIPE-NAME>",
			"fixed_params": {
				"org": "{{org.slug}}",
				"user": "{{user.id}}"
			}
		}
	],
	"workspace_id": "<YOUR-TINYBIRD-WORKSPACE-ID>"
}
```
- Use your Tinybird admin token as signking key.
- Add as many scopes as needed, use fixed params to filter your Tinybird API endpoints.
- Configure `fixed_params` to match the parameter names and values in your Tinybird API endpoints. Example:

```sql
NODE endpoint
SQL >
    SELECT * FROM ds
    WHERE 1
    {% if defined(org) %}
        AND org = {{String(org)}}
    {% end %}
    {% if defined(user) %}
        AND user = {{String(user)}}
    {% end %}

TYPE endpoint
```

## How it works

On Sign In, the app authenticates with Clerk, the middleware picks up the session and creates a multi-tenant Tinybird JWT token using the `tinybird` JWT template from Clerk, finally adds the token to the response headers to be used by the application.

Use the token to query Tinybird as the authenticated user.

## User management

- Use Clerk to manage users and organizations.
- Assign organizations to users and define organization permissions.
- Use those organization permissions to create multi-tenant Tinybird JWT tokens using the `fixed_params` feature.

## Contributing

Please open an issue or submit a pull request.

## Support

Join the Tinybird Slack community to get help with your project.

Learn more about [Tinybird JWT tokens](https://www.tinybird.co/docs/forward/get-started/authentication) and [Clerk](https://www.tinybird.co/docs/forward/publish-your-data/api-endpoints/guides/multitenant-real-time-apis-with-clerk-and-tinybird).

## License

MIT License

Copyright (c) 2025 Tinybird.co
