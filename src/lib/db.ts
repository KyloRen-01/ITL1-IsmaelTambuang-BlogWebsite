import { supabase } from "./supabase";
import { Post } from "@/types/post";

// Fetch all visible posts
export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .eq("is_hidden", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// Fetch single post by ID
export async function fetchPostById(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Post;
}

// Fetch post by slug
export async function fetchPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .eq("slug", slug)
    .eq("is_hidden", false)
    .single();

  if (error) throw error;
  return data as Post;
}

// Create new post
export async function createPost(
  post: Omit<Post, "id" | "updated_at" | "created_at"> & {
    created_at?: string;
  },
) {
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

// Update post
export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

// Delete post
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
}

// Toggle visibility
export async function togglePostVisibility(id: string, isHidden: boolean) {
  return updatePost(id, { is_hidden: isHidden });
}

// Fetch all posts (including hidden) - for admin dashboard
export async function fetchAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// Search posts
export async function searchPosts(query: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .eq("is_hidden", false)
    .or(
      `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// User functions
interface User {
  id: string;
  email: string;
  name?: string;
  birthday?: string;
  created_at: string;
  is_admin?: boolean;
  avatar_url?: string | null;
}

// Create a user record
export async function createUser(id: string, email: string, name?: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id,
        email,
        name: name || email.split("@")[0],
        is_admin: false,
        avatar_url: null,
      },
    ])
    .select()
    .single();

  if (error) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string"
        ? (error as { message: string }).message
        : "";

    if (message.includes("users_email_key")) {
      const { data: existing, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError) throw fetchError;
      return existing as User;
    }

    throw error;
  }
  return data as User;
}

// Fetch user by ID
export async function fetchUser(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as User;
}

// Fetch user by email
export async function fetchUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data as User;
}

// Delete user account (from database)
export async function deleteUserAccount(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw error;
}

// Update user profile with safe fallbacks
export async function updateUserProfile(
  id: string,
  updates: {
    name?: string;
    birthday?: string | null;
    email?: string;
    avatar_url?: string | null;
  },
) {
  const payload: Record<string, any> = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.email !== undefined) payload.email = updates.email;
  if (updates.avatar_url !== undefined) payload.avatar_url = updates.avatar_url;
  payload.birthday = updates.birthday ?? null;

  // 1) Update by id
  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (data) return data as User;

  // 2) If no row exists for this id, try updating by email (do not change id)
  if (updates.email) {
    const { data: existingByEmail, error: lookupError } = await supabase
      .from("users")
      .select("*")
      .eq("email", updates.email)
      .maybeSingle();

    if (lookupError) {
      const details =
        typeof lookupError === "object" &&
        lookupError !== null &&
        "message" in lookupError
          ? String((lookupError as { message?: string }).message)
          : lookupError === undefined
            ? "Unknown error"
            : JSON.stringify(lookupError);
      console.error("Supabase lookup-by-email error:", lookupError);
      throw new Error(`Supabase lookup-by-email error: ${details}`);
    }

    if (existingByEmail) {
      const { data: byEmail, error: emailError } = await supabase
        .from("users")
        .update(payload)
        .eq("email", updates.email)
        .select()
        .single();

      if (byEmail) return byEmail as User;
      if (emailError) {
        const details =
          typeof emailError === "object" &&
          emailError !== null &&
          "message" in emailError
            ? String((emailError as { message?: string }).message)
            : emailError === undefined
              ? "Unknown error"
              : JSON.stringify(emailError);
        console.error("Supabase update-by-email error:", emailError);
        throw new Error(`Supabase update-by-email error: ${details}`);
      }
    }
  }

  // 3) Finally insert if nothing exists
  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert([{ id, ...payload }])
    .select()
    .single();

  if (insertError) {
    const details =
      typeof insertError === "object" &&
      insertError !== null &&
      "message" in insertError
        ? String((insertError as { message?: string }).message)
        : insertError === undefined
          ? "Unknown error"
          : JSON.stringify(insertError);
    console.error("Supabase insert error:", insertError);
    throw new Error(`Supabase insert error: ${details}`);
  }

  if (!inserted) {
    throw new Error(
      "Profile update returned no data. Check RLS policies for users table.",
    );
  }
  return inserted as User;
}

// Update admin status by email
export async function updateUserAdminByEmail(email: string, isAdmin: boolean) {
  const { data, error } = await supabase
    .from("users")
    .update({ is_admin: isAdmin })
    .eq("email", email)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

// Fetch posts by author ID
export async function fetchPostsByAuthor(authorId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email, avatar_url)")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// Delete user authentication (client-side - limited functionality)
// NOTE: Full auth deletion requires server-side admin API
export async function deleteCurrentUserAuth() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    // Sign out the user
    await supabase.auth.signOut();

    // For complete deletion, see admin deletion method below
    return {
      success: true,
      message:
        "User signed out. Note: Complete auth deletion requires admin API.",
    };
  } catch (error) {
    throw error;
  }
}

// Comment functions
interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

// Fetch comments for a post
export async function fetchComments(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Comment[];
}

// Submit a new comment
export async function submitComment(
  postId: string,
  authorName: string,
  authorEmail: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        author_name: authorName,
        author_email: authorEmail,
        content,
        is_approved: false,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}
