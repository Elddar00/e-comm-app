import { Router } from "express";

const router: Router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Works!" });
});

export default router;
