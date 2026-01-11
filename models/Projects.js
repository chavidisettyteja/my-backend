const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    possession: String,
    status: String,
    location: String,

    imageUrl: String,
    bgimageUrl: String,
    brochureUrl: String,

    priceRange: {
      min: Number,
      max: Number,
    },

    bhk: {
      "2BHK": Boolean,
      "3BHK": Boolean,
      "4BHK": Boolean,
    },

    amenities: {
      welcomeLounge: Boolean,
      banquetHall: Boolean,
      badminton: Boolean,
      swimmingPool: Boolean,
      indoorGames: Boolean,
      theatre: Boolean,
      gym: Boolean,
      cafe: Boolean,
      evCharging: Boolean,
      spa: Boolean,
      library: Boolean,
      basketball: Boolean,
      community: Boolean,
      partyLawn: Boolean,
      volleyball: Boolean,
      temple: Boolean,
      barbeque: Boolean,
      miniGolf: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
