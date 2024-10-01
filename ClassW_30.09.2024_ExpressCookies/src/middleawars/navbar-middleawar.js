import {navbarList} from "../data/navbar-list.js";

const navbar = (req, res, next) => {
    res.locals.navbarList = navbarList;
    next();
};

export default navbar;