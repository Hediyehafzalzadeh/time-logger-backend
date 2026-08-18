import Task from "../models/Task.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    const categoryInput = req.body.category ;

    const categoryQuery = mongoose.Types.ObjectId.isValid(categoryInput)
      ? { _id: categoryInput, userId }
      : { name: categoryInput, userId };

    const category = await Category.findOne({
      ...categoryQuery,
    });

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const task = await Task.create({
      ...req.body,
      userId,
      category: category._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    const { start, end } = req.query;

    const filter = {
      userId,
    };

    if (start || end) {
      filter.createdAt = {};

      if (start) {
        filter.createdAt.$gte = new Date(start);
      }

      if (end) {
        filter.createdAt.$lte = new Date(end);
      }
    }

    const tasks = await Task.find(filter);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    // Prepare update payload
    const updateData = { ...req.body };

    // If frontend sent a category name (or categoryId), resolve it to the Category _id
    const categoryInput = req.body.category ?? req.body.categoryId;
    if (categoryInput) {
      const categoryQuery = mongoose.Types.ObjectId.isValid(categoryInput)
        ? { _id: categoryInput, userId }
        : { name: categoryInput, userId };

      const category = await Category.findOne({ ...categoryQuery });

      if (!category) {
        return res.status(400).json({ message: "Invalid category" });
      }

      updateData.category = category._id;
      // remove any name/id fields to avoid storing the raw input
      delete updateData.categoryId;
      delete updateData.categoryName;
      // also delete if frontend mistakenly sent category as name string field
      if (
        typeof req.body.category === "string" &&
        !mongoose.Types.ObjectId.isValid(req.body.category)
      ) {
        // already set updateData.category to ObjectId, remove the name
        // (delete above covers updateData.categoryName if used)
      }
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId },
      updateData,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
