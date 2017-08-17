// const faker = require('faker')

// const { Campground, Comment } = require('../models')

// /**
//  * REVIEW
//  * FIXME
//  *
//  * Possible refactor using Model.bulkWrite() || Model.insertMany()
//  * @see http://mongoosejs.com/docs/api.html#model_Model.bulkWrite
//  * @see http://mongoosejs.com/docs/api.html#model_Model.insertMany
//  *
//  * Fun fact:
//  * @see http://mongoosejs.com/docs/api.html#query_Query-lean
//  */

// const campSeeds = [
//   {
//     description: faker.lorem.sentences(),
//     name: faker.name.jobTitle(),
//     image: faker.image.avatar()
//   },
//   {
//     description: faker.lorem.sentences(),
//     name: faker.name.jobTitle(),
//     image: faker.image.avatar()
//   },
//   {
//     description: faker.lorem.sentences(),
//     name: faker.name.jobTitle(),
//     image: faker.image.avatar()
//   }
// ]
// const commentSeed = {
//   author: faker.name.firstName(),
//   text: faker.lorem.sentences()
// }

// const generateSeeds = data => {
//   try {
//     return data.forEach(async i => {
//       // create a campground instance.
//       const campground = await Campground.create(i)
//       // create a comment instance.
//       const comment = await Comment.create(commentSeed)
//       // add comment to campground.
//       campground.comments.push(comment)
//       // persist campground changes.
//       campground.save()
//     })
//   } catch (error) {
//     throw error
//   }
// }

// module.exports = async () => {
//   try {
//     await Promise.all([Campground.remove({}), Comment.remove({})])
//     await generateSeeds(campSeeds)
//   } catch (error) {
//     throw error
//   }
// }
