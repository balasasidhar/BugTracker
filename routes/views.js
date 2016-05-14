/**
 * Created by SASi on 14-May-16.
 */


const views = require('../controllers/views');
const router = global.express.Router();

router.get("/tmpl/:name", views.templates);
router.all("*", views.index);

module.exports = router;