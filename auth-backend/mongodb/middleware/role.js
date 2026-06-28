// middleware/role.js

export const superAdminOnly = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super Admin only.",
    });
  }

  next();
};