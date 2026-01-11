const { AbilityBuilder, createMongoAbility } = require( "@casl/ability");
const Role = require('../models/Role')

export async function buildAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  const role = await Role.findById(user.role).populate('permissions');

  if (role.role.code === "SUPER_ADMIN") {
     can('manage', 'all')
     return build();
  }

  role.role.permissions.forEach(p => {
    const action = p.action;
    const subject = p.subject;

    can(action, subject);
  });

  return build();
}
