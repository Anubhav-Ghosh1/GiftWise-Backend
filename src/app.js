import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// routes
import userRouter from "./routes/user_routes.js";
import tweetRouter from "./routes/tweet_routes.js";
import subscriptionRouter from "./routes/subscription_routes.js";
import videoRouter from "./routes/video_routes.js";
import likeRouter from "./routes/like_routes.js";
import playlistRouter from "./routes/playlist_routes.js";
import dashboardRouter from "./routes/dashboard_routes.js";
import commentRouter from "./routes/comment_routes.js";

// routes declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)
// When we write exact name of the function then the function is not exported using default
// when we export using deault we can name the function anything

export { app };