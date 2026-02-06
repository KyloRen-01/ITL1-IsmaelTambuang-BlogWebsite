import React, { useState } from "react";
import { Post } from "@/types/post";
import { togglePostVisibility, deletePost } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Search,
  Newspaper,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";

interface PostManagerProps {
  posts: Post[];
  loading: boolean;
  onRefresh: () => void;
  onEdit: (postId: string) => void;
}

const PostManager: React.FC<PostManagerProps> = ({
  posts,
  loading,
  onRefresh,
  onEdit,
}) => {
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.type.includes(search.toLowerCase()),
  );

  const handleToggleVisibility = async (post: Post) => {
    setTogglingId(post.id);
    try {
      await togglePostVisibility(post.id, !post.is_hidden);
      onRefresh();
    } catch (err: any) {
      console.error("Toggle failed:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (postId: string) => {
    setDeletingId(postId);
    try {
      await deletePost(postId);
      setConfirmDeleteId(null);
      onRefresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = {
    total: posts.length,
    articles: posts.filter((p) => p.type === "article").length,
    news: posts.filter((p) => p.type === "news").length,
    hidden: posts.filter((p) => p.is_hidden).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Posts",
            value: stats.total,
            color: "blue",
            icon: <BookOpen className="h-5 w-5" />,
          },
          {
            label: "Articles",
            value: stats.articles,
            color: "cyan",
            icon: <BookOpen className="h-5 w-5" />,
          },
          {
            label: "News",
            value: stats.news,
            color: "amber",
            icon: <Newspaper className="h-5 w-5" />,
          },
          {
            label: "Hidden",
            value: stats.hidden,
            color: "red",
            icon: <EyeOff className="h-5 w-5" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-${stat.color}-400`}>{stat.icon}</span>
              <span className="text-2xl font-bold text-white">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search posts by title or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 rounded-xl"
        />
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-700 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-1/3" />
                  <div className="h-3 bg-slate-700 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No posts found
          </h3>
          <p className="text-slate-400 text-sm">
            {search
              ? "Try a different search term"
              : "Create your first post to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-slate-800/50 border rounded-xl p-5 transition-all ${
                post.is_hidden
                  ? "border-red-500/20 opacity-60"
                  : "border-slate-700/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-700 shrink-0 hidden sm:block">
                  {post.images && post.images.length > 0 ? (
                    <img
                      src={post.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        post.type === "news"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {post.type}
                    </span>
                    {post.is_hidden && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400">
                        Hidden
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold truncate">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.reading_time}m read
                    </span>
                    {post.images && post.images.length > 0 && (
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {post.images.length} images
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleVisibility(post)}
                    disabled={togglingId === post.id}
                    className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg h-9 w-9"
                    title={post.is_hidden ? "Show post" : "Hide post"}
                  >
                    {togglingId === post.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : post.is_hidden ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(post.id)}
                    className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg h-9 w-9"
                    title="Edit post"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {confirmDeleteId === post.id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-xs h-9 px-3"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg h-9 w-9"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmDeleteId(post.id)}
                      className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg h-9 w-9"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostManager;
