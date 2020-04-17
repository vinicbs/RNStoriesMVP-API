const Story = require('../models/story.model');
const User = require('../models/user.model');
const ErrorResponse = require('../http/ErrorResponse');
const SuccessResponse = require('../http/SuccessResponse');

const create = (req, res, next) => {
    Story.query().insert({ media: req.body.media, user_id: req.body.authUser }).then(story => {
        next(new SuccessResponse(200, 'story created', story));
    }).catch(err => {
        next(new ErrorResponse(400, err.name, err.data));
    })
}

const listByUser = (req, res, next) => {
    User.query()
        .joinRelated('stories')
        .select('users.*', User.knex().raw(`JSON_AGG(stories.*) AS stories`))
        .groupBy('users.id')
        .page(req.query.page, req.query.page_size)
        .then(stories => {
            next(new SuccessResponse(200, 'stories list', stories));
        }).catch(err => {
            next(new ErrorResponse(400, err.name, err.data));
        })
}

const upload = (req, res, next) => {
    Story.query().insert({ media: req.file.cloudStoragePublicUrl, user_id: req.body.authUser, mediaType: req.query.type }).then(story => {
        next(new SuccessResponse(200, 'story created', story));
    }).catch(err => {
        next(new ErrorResponse(400, err.name, err.data));
    })
}

module.exports = {
    create,
    listByUser,
    upload
}