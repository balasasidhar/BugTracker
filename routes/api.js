/**
 * Created by SASi on 14-May-16.
 */

'use strict';

const api = require('../controllers/api');
const router = global.express.Router();

router.route('/user/login')
    .post(api.login);

router.route('/user/register')
    .post(api.register);

router.route('/project')
    .post(api.addProject)
    .get(api.getProjects);

router.route('/project/:id')
    .put(api.updateProject)
    .get(api.getProject)
    .delete(api.deleteProject);

router.route('/report')
    .post(api.reportError);

module.exports = router;