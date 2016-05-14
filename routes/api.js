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

module.exports = router;