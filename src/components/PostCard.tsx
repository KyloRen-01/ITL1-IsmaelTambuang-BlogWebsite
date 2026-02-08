import React from "react";
import { Post } from "@/types/post";
import {
  Clock,
  ArrowRight,
  Newspaper,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";

interface PostCardProps {
  post: Post;
  onReadMore: (postId: string) => void;
  p?: boolean;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onReadMore,
  featured = false,
}) => {
  const normalizeDateString = (value: string) => {
    const iso = value.includes("T") ? value : value.replace(" ", "T");
    const hasTimezone = /[zZ]|[+-]\d{2}:\d{2}$/.test(iso);
    return hasTimezone ? iso : `${iso}Z`;
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(normalizeDateString(dateStr));
    const datePart = date.toLocaleDateString("en-US", {
      timeZone: "Asia/Manila",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
    });
    return `${datePart} • ${timePart}`;
  };

  const coverImage =
    post.images && post.images.length > 0
      ? post.images[0]
      : `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop`;

  const previewText =
    post.excerpt ||
    (post.type === "news"
      ? post.news_link || "External news link"
      : post.content.substring(0, 200));

  const publisherName =
    post.users?.name || post.users?.email?.split("@")[0] || "Unknown";

  const handleCardClick = () => {
    if (post.type === "news" && post.news_link) {
      window.open(post.news_link, "_blank", "noreferrer");
      return;
    }
    onReadMore(post.id);
  };

  if (featured) {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer col-span-full lg:col-span-2 relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative h-64 lg:h-full overflow-hidden">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/20" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  post.type === "news"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}
              >
                {post.type === "news" ? (
                  <Newspaper className="h-3 w-3" />
                ) : (
                  <BookOpen className="h-3 w-3" />
                )}
                {post.type}
              </span>
              <span className="text-slate-500 text-xs font-medium">
                Featured
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
              {previewText}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDateTime(post.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.reading_time} min read
                </span>
              </div>
              <span className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <User className="h-3.5 w-3.5" />
              {publisherName}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${
              post.type === "news"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}
          >
            {post.type === "news" ? (
              <Newspaper className="h-3 w-3" />
            ) : (
              <BookOpen className="h-3 w-3" />
            )}
            {post.type}
          </span>
        </div>
        {post.images && post.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
            +{post.images.length - 1} images
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {previewText}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDateTime(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.reading_time}m
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <User className="h-3 w-3" />
          {publisherName}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
