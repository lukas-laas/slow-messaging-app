## Final weekend assignment.

Written by Lukas Låås

### High level planning

https://github.com/orgs/saltsthlm/projects/69

0. Installing and making sure the flow works from db to frontend.
1. Show data in frontend using a mocked db (Makes the structure easier to change).
2. Add login functionality.
3. Figure out logic for what messages to show and implementing.
4. Add refetching and checks if user is allowed to refetch.
5. Figure out functions for calculating stats and showing stats in table.
6. Generate and migrate to postgres db.
7. Clean up code and styling.

### Choices I made

- Not encrypting cookies for this assignment for the sake of simplicity.
- Pushing .env to GH to make the setup easier for grading.
- Using vitest as that is what NextJS recommends in their docs.
- Storing all fetches in database and calculating if the user is allowed to
  <br>fetch instead of having tokens as cookies. This will make the stats logic
  <br>simpler and users will get all their fetches even if the server is down
  <br>when the tokens are updated.

### Useful information

- run: docker compose up
- run: pnpm i
- run: pnpm run migrate
- run: pnpm run build
- run: pnpm run start
- Password: 123456
- Statistics page can be found at /statistics
