# ChatRoom

## V1.1.0

### Changes

1. Migrated from Stomp to raw WebSocket.

2. Added auto generated timestamp to messages.

3. Implemented rate limiting and connection limit.
    - If connection limit is exceded the user is not allowed to connect.
    - If rate limit is exceded the user is disconnected.

4. Improved chat UI.

5. Show disconnect reason and add the option to connect manually.

6. Show currently connected users on UI.

7. Ensured nicknames are unique per session.

8. Added a "Change nickname" option.
