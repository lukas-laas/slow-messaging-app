## Final weekend assignment.

Written by Lukas Låås

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
