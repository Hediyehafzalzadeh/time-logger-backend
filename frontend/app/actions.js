"use server";
import { cookies } from "next/headers";

export async function getTasks() {
  try {
    const token = await getTokenFromCookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    console.log("Fetched tasks:", data);
    return data || [];
  } catch (error) {
    console.error("Get tasks error :", error);
    return [];
  }
}

export async function getTasksInWeek(date) {
  try {
    const token = await getTokenFromCookies();
    const oneWeekAgo = new Date(date);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const params = new URLSearchParams({
      start: oneWeekAgo.toISOString().split("T")[0],
      end: date.toISOString().split("T")[0],
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks?${params.toString()}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks in week");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Get tasks in week error :", error);
    return [];
  }
}

export async function getTodaysTasks() {
  try {
    const token = await getTokenFromCookies();
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks?start=${today}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch today's tasks");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Get today's tasks error :", error);
    return [];
  }
}

export async function getHistoryByDate(date) {
  const tomorrow = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  try {
    const token = await getTokenFromCookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks?start=${date.toISOString().split("T")[0]}&end=${tomorrow}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch history by date");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Get history by date error :", error);
    return [];
  }
}

export async function addTask(task) {
  if (!task) throw new Error("no task provided");

  try {
    const token = await getTokenFromCookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      credentials: "include",
     headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
  } catch (error) {
    console.error("error in saveTask :", error);
    return { error: error.message || "Failed to save task" };
  }
}

export async function deleteTask(task) {
  if (!task) throw new Error("no task provided");

  try {
    const token = await getTokenFromCookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("error in deleteTask :", error);
    return { error: error.message || "Failed to delete task" };
  }
}

export async function updateTask(task, updatedTask) {
  if (!task) throw new Error("no task provided");

  try {
    const token = await getTokenFromCookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(updatedTask),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("error in updateTask :", error);
    return { error: error.message || "Failed to save task" };
  }
}

export async function getCategories() {
  try {
    const token = await getTokenFromCookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Get categories error :", error);
    return [];
  }
}

export async function addCategory(category) {
  if (!category) throw new Error("no category provided");

  try {
    const token = await getTokenFromCookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(category),
      },
    );

    if (response.status !== 201) {
      throw new Error("Failed to add category");
    }
    const data = await response.json();

    console.log("Added category:", data);
    return data;
  } catch (error) {
    console.error("error in addCategories :", error);
    return { error: error.message || "Failed to add category" };
  }
}

export async function deleteCategory(id) {
  if (!id) throw new Error("no category provided");

  try {
    const token = await getTokenFromCookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );
     const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }return data;
  } catch (error) {
    console.error("error in deleteCategory :", error);
    return { error: error.message || "Failed to delete category" };
  }
    
}

const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};
