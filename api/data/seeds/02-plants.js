
exports.seed = function(knex) {
  return knex('plants').del() 
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { nickname: "Azalea", species: "Rhododendron", 
        h2OFrequency: 12, howMuchWater: "", details: "", owner: 1 },

        { nickname: "Spider Plant", species: "Chlorophytum comosum", 
        h2OFrequency: 7, howMuchWater: "", details: "", owner: 2 },

      ]);
    });
};

const plants = [
  { nickname: "Azalea", species: "Rhododendron", 
  h2OFrequency: 12, howMuchWater: "", details: "", owner: 1 },

  { nickname: "Spider Plant", species: "Chlorophytum comosum", 
  h2OFrequency: 7, howMuchWater: "", details: "", owner: 2 },
]
exports.plants = plants

// exports.seed = function (knex) {
//   return knex('plants').insert(plants)
// }

exports.seed = function(knex) {
  return knex('plants').truncate() //reset primary keys
    .then(function () {
      return knex('plants').insert(plants);
    });
};