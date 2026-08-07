const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// Index & Create route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update & Delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isOwner,
        wrapAsync(listingController.destroyListing)
    );

// Edit route
router.get("/:id/edit",
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;