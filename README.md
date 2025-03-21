# Clerk + Tinybird JWT template

This is a template for a Next.js app that uses [Clerk](https://clerk.com/) for authentication and multi-tenant [Tinybird](https://tinybird.co/) real-time analytics applications.

## Getting Started

1. Create a new Clerk application
2. Create a new Tinybird workspace
3. Create an `.env` file from the `.env.example` file and fill in the values
4. Run `npm install`
5. Run `npm run dev`

## How it works

On Sign In, the app authenticates with Clerk, the middleware picks up the session and creates a multi-tenant Tinybird JWT token and adds it to the response headers.

You can use the token to query Tinybird as the authenticated user.

## User management

- Use Clerk to manage users and organizations.
- Assign organizations to users and define organization permissions.
- Use those organization permissions to create multi-tenant Tinybird JWT tokens using the `fixed_params` feature.

## Contributing

Please open an issue or submit a pull request.

## Support

Join the Tinybird Slack community to get help with your project.

Learn more about Tinybird JWT tokens in the [Tinybird docs](https://www.tinybird.co/docs/forward/get-started/authentication).

## License

MIT License

Copyright (c) 2025 Tinybird.co
