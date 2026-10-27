const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    bgImage: { type: String },
    badge: { type: String },
    tagline: { type: String },

    // ⚡ এই নতুন প্রপার্টিগুলো যুক্ত করুন ⚡
    isActive: { type: Boolean, default: true },
    bgColor: { type: String, default: '#09090b' },
    textColor: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'font-sans' },
    alignment: { type: String, default: 'text-left' },
    autoPlaySpeed: { type: Number, default: 6000 }
}, { timestamps: true });

const Banners = mongoose.model('Banner', BannerSchema);


module.exports = Banners;