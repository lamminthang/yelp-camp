# Yelp Camp :tent:

[![Commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rockchalkwushock/how-to-open-source/pulls)

[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Equimper](https://img.shields.io/badge/code%20style-equimper-blue.svg?style=flat-square)](https://github.com/EQuimper/eslint-config-equimper)
[![nps](https://img.shields.io/badge/scripts%20run%20with-nps-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)

[![Now](https://img.shields.io/badge/deployed%20with-now--cli-orange.svg?style=flat-square)](https://github.com/zeit/now-cli)
[![API Docs](https://img.shields.io/badge/apidocs-hosted%20on%20surge-orange.svg?style=flat-square)]('#')

A Yelp like clone for campgrounds.

This project utilizes the latest JavaScript syntax available in NodeJS.

## TODO :heavy_check_mark: :heavy_check_mark: :heavy_check_mark:

- [ ] Setup relationship for User Model with multiple authentication models.
- [ ] Finalize styling.
- [ ] Create external docs with `apidocs`.
- [ ] Host external docs with `surge`.
- [ ] Turn on _production_ environment with social authentication services.
- [ ] Deploy _production_ ready application to [Zeit](https:/zeit.co) using `now-cli`.

Coming Soon: ~~[Live Demo]('#')~~

> NOTE: The deployment is not scaled and the database is a free sandbox so it will take a few minutes to load up!

## Concepts Covered

- [x] REST API Architecture.
- [x] Promises using `async/await` syntax.
- [x] noSQL Database (`mongodb`).
- [x] Associating data in noSQL databases.
- [x] Authentication with `facebook`, `google`, & `twitter`.
- [x] `ejs` templating.

## REST API Architecture

### Authentication

Name     | Endpoint                       | Verb    | Description                                 |
---------|--------------------------------|---------|---------------------------------------------|
Facebook | `/auth/facebook`                 | GET    | Request authentication via Facebook.        |
Google   | `/auth/google`                   | GET    | Request authentication via Google.          |
Twitter  | `/auth/twitter`                  | GET    | Request authentication via Twitter.         |

### Campgrounds

> All routes prefixed by `/campgrounds`.

Name   | Endpoint                       | Verb    | Description                                 |
-------|--------------------------------|---------|---------------------------------------------|
GET    | `/`                              | GET     | Render view for *all* campgrounds.          |
NEW    | `/new`                          | GET     | Render view for adding campground.          |
CREATE | `/`                              | POST    | Add a campground to the database.           |
SHOW   | `/:id`                           | GET     | Render view for *single* campground.        |
EDIT   | `/:id/edit`                      | GET     | Render view for editing a campground.       |
UPDATE | `/:id`                           | PUT     | Render view *after* updating a campground.  |
REMOVE | `/:id`                           | DELETE  | Render view *after* removing a campground.  |

### Comments

> All routes prefixed by `/campgrounds/:id/comments`.

Name   | Endpoint           | Verb    | Description                                                     |
-------|--------------------|---------|-----------------------------------------------------------------|
NEW    | `/new`               | GET     | Render view for adding a new comment to current campground.     |
CREATE | `/`                  | POST    | Add a comment to the database for current campground.           |
EDIT   | `/:comment_id/edit`  | GET     | Render view for editing a comment for current campground.       |
UPDATE | `/:comment_id`       | PUT     | Render view *after* updating a comment for current campground.  |
REMOVE | `/:comment_id`       | DELETE  | Render view *after* removing a comment for current campground.  |
