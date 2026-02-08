import React, { useState, useMemo } from "react";
import { Post, PostFilter } from "@/types/post";
import PostCard from "@/components/PostCard";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Newspaper,
  LayoutGrid,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostFeedProps {
  posts: Post[];
  loading: boolean;
  onReadMore: (postId: string) => void;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, loading, onReadMore }) => {
  const [filter, setFilter] = useState<PostFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by type
    if (filter !== "all") {
      result = result.filter((p) => p.type === filter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q),
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, filter, searchQuery, sortBy]);

  const filterTabs: {
    key: PostFilter;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "all",
      label: "All Posts",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      key: "article",
      label: "Articles",
      icon: <BookOpen className="h-4 w-4" />,
    },
    { key: "news", label: "News", icon: <Newspaper className="h-4 w-4" /> },
  ];

  const SkeletonCard = () => (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-700/50" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-700 rounded w-20" />
        <div className="h-5 bg-slate-700 rounded w-full" />
        <div className="h-5 bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-slate-700 rounded w-full" />
        <div className="h-3 bg-slate-700 rounded w-2/3" />
      </div>
    </div>
  );

  return (
    <section id="feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Latest Content
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Browse our collection of articles and news updates, carefully curated
          to bring you the most relevant content.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSortBy((s) => (s === "newest" ? "oldest" : "newest"))
            }
            className="border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl shrink-0"
            title={`Sort by ${sortBy === "newest" ? "oldest" : "newest"}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sort indicator */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing {filteredPosts.length} of {posts.length} posts
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </p>
        <button
          onClick={() =>
            setSortBy((s) => (s === "newest" ? "oldest" : "newest"))
          }
          className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
        >
          Sorted by: {sortBy === "newest" ? "Newest first" : "Oldest first"}
        </button>
      </div>

      {/* Posts grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No posts found
          </h3>
          <p className="text-slate-400">
            {searchQuery
              ? "Try adjusting your search query"
              : "No posts have been published yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onReadMore={onReadMore} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PostFeed;
