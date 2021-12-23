
exports.seed = function(knex) {
  return knex('users').truncate() //reset primary keys
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { firstName: "Maby", lastName: "Lambda", username: "Maby", phoneNumber: "123456789", password:  "$2a$08$P7HD/UK1lnRtGduXwNSADexioxonhc3mIlfZrBZ64/n6VfBp/BVpy" },
        { firstName: "Mabita", lastName: "School", username: "Mabita", phoneNumber: "123456789", password:  "$2a$08$P7HD/UK1lnRtGduXwNSADexioxonhc3mIlfZrBZ64/n6VfBp/BVpy"},

      ]);
    });
};
