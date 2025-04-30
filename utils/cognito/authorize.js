import jwt from "jsonwebtoken";

export const authorizeAdmin = (event) => {
    try {
        const token = event.headers.Authorization || event.headers.authorization;
        if (!token) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Unauthorized: No token provided" }),
            };
        }

        const decodedToken = jwt.decode(token.replace("Bearer ", ""), { complete: true });
        if (!decodedToken) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Unauthorized: Invalid token" }),
            };
        }

        const claims = decodedToken.payload;
        const groups = claims["cognito:groups"] || [];
        if (!groups.includes("admin")) {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: "Forbidden: User is not an admin" }),
            };
        }

        return { isAuthorized: true };
    } catch (err) {
        console.error("Authorization error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error: Authorization failed" }),
        };
    }
};