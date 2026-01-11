import { buildAbilityFor } from "../casl/ability.factory.js";

export const checkAbility = (action, subject) => {
  return async (req, res, next) => {
    const ability = await buildAbilityFor(req.user);

    if (ability.can(action, subject)) {
      return next();
    }

    return res.status(403).json({
      message: "Forbidden Error"
    });
  };
};
