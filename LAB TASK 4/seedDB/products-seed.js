const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------WOMEN
  const WOMEN_titles = [
    "Classic Blue Backpack",
    "Black Fjallraven Backpack",
    "Brown and Green Leather Backpack",
    "Grey Stylish Backpack",
    "Elegant Black Backpack",
    "Practical Blue Backpack With Leather Straps",
    "Soft Classic Biege Backpack",
    "Practical Durable Backpack",
    "Comfortable Laptop Backpack",
    "Extra Large Grey Backpack",
  ];
  const WOMEN_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/03SDYW24V53D_1.jpg?v=1730878933&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/003SFSW24V52_2_9957b0cb-1737-4910-aa60-3a060919d6d6.jpg?v=1730959171&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/00PBDW24V39D_1.jpg?v=1730878629&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/003SFSW24V54_2_84f2c61e-ce55-4d31-bac2-8796f5ba99f4.jpg?v=1730959237&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/02PESTW24V52_5.jpg?v=1730888311&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/02PESTW24V53_4.jpg?v=1730888326&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/02PESTW24V54_3.jpg?v=1730888352&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/02STSGW24V55_5.jpg?v=1730888784&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/0F3PLXW24V58_5.jpg?v=1730886147&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/003SDYW24V51_5.jpg?v=1730889055&width=600",
  ];

  //--------------------MEN
  const MEN_titles = [
    "Stylish Pastel Pink Travel Bag",
    "A Fahionable Set of Two Pink Travel Bags",
    "White and Black Hard Luggage",
    "Rainbow Dotted Duffle Bag Luggage",
    "Blue and Gray Classic Suitcase",
    "A Set of Three Hard Durable Suitcases",
    "Light Blue Hard Luggage",
    "Black Leather Vintage Suitcase",
    "A Set of Three Large Travel Bags",
    "Two Stylish Light Green Travel Bags With Different Sizes",
    "Simple Blue Luggage with Many Compartments",
  ];

  const MEN_imgs = [
    "https://p1.pxfuel.com/preview/899/786/420/travel-bag-hard-and-bag.jpg",
    "https://p1.pxfuel.com/preview/479/120/981/luggage-metallic-luguagge-case.jpg",
    "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    "https://cdn.pixabay.com/photo/2019/06/20/16/10/duffle-bag-4287485_960_720.png",
    "https://p0.pikrepo.com/preview/74/133/blue-and-gray-suede-rolling-luggage-thumbnail.jpg",
    "https://cdn.pixabay.com/photo/2019/01/22/15/53/suitcases-3948389_960_720.png",
    "https://cdn.pixabay.com/photo/2019/07/09/11/52/travel-bag-4326738_960_720.jpg",
    "https://p0.pxfuel.com/preview/942/496/984/various-bag-bags-luggage.jpg",
    "https://p0.pxfuel.com/preview/273/580/962/travelvarious-bag-bags-holiday.jpg",
    "https://p1.pxfuel.com/preview/926/897/247/travel-bag-hard-and-bag.jpg",
    "https://p0.pxfuel.com/preview/963/699/697/bag-blue-handbag-white.jpg",
  ];

  //--------------------KIDS
  const KIDS_titles = [
    "Aluminium Metal Suitcase",
    "Black Leather Durable Suitcase",
  ];

  const KIDS_imgs = [
    "https://upload.wikimedia.org/wikipedia/commons/6/6d/Aluminium_Briefcase.jpg",
    "http://res.freestockphotos.biz/pictures/1/1751-black-leather-briefcase-on-a-white-background-pv.jpg",
  ];

  //--------------------BEAUTY
  const BEAUTY_titles= [
    "Pink Leather Crossbody Bag",
    "Stylish Pink Crossbody Bag",
    "Mini Black Carra Shoulder Bag",
    "White Leather Mini Bag with Crossbody Strap",
    "Blue Jeans Mini Bag",
    "Biege Be Dior Mini Bag with Crossbody Strap",
    "Red Be Dior Mini Bag with Crossbody Strap",
    "Light Blue Mini Bag with Golden Strap",
    "Light Green Mini Bag with Golden Strap",
    "Pastel Pink Mini Bag with Golden Strap",
    "Biege Leather Crossbody Bag",
    "White Leather Crossbody Bag",
    "Elegant White Mini Bag with Silver Strap",
    "Simple Red Mini Bag",
  ];
  const BEAUTY_imgs = [
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/DKNY_Mini_Flap_Crossbody_W_-_SS_Crossbody_R1513004_Kalbsleder_beige_%281%29_%2816080518124%29.jpg",
    "https://p1.pxfuel.com/preview/177/215/691/handbag-bag-today-the-postwoman-fashion-style-skin.jpg",
    "https://p2.piqsels.com/preview/392/1016/905/handbags-white-fashion-bag-shoulder-bag.jpg",
    "https://c.pxhere.com/photos/37/cb/camera_bag_scene_package_fashion-900156.jpg!d",
    "https://c.pxhere.com/photos/94/0e/bag_dior_x_n-867928.jpg!d",
    "https://c.pxhere.com/photos/92/ad/bag_dior_u-867943.jpg!d",
    "https://c.pxhere.com/photos/5b/ea/bag_fashion_style-518819.jpg!d",
    "https://c.pxhere.com/photos/19/aa/bag_fashion_style-518820.jpg!d",
    "https://c.pxhere.com/photos/41/9e/bag_fashion_style-518821.jpg!d",
    "https://c.pxhere.com/photos/24/f9/bag_fashion_style-518803.jpg!d",
    "https://c.pxhere.com/photos/16/e8/bag_fashion_style-518804.jpg!d",
    "https://images.unsplash.com/photo-1564422167509-4f8763ff046e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    "https://c.pxhere.com/photos/87/f0/bag_crimson_product_photos_padlock_bag_women_bags_dot_white-1000331.jpg!d",
  ];

  //-----------------------ACCESSORIES
  const ACCESSORIES_titles = [
    "Hot Pink Leather Purse",
    "Glittery Black Purse with Golden Strap",
    "Practical Black Leather Purse",
    "Red Leather Pouche with Free Earrings",
    "Lavender Leather Purse",
    "White and Black Snakeskin Purse",
    "Dark Brown Simple Purse",
    "Red Kipling Pouche",
    "Biege Kipling Pouche",
  ];
  const ACCESSORIES_imgs = [
    "https://c.pxhere.com/photos/c2/fc/bag_fashion_style-518806.jpg!d",
    "https://images.unsplash.com/photo-1564222195116-8a74a96b2c8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    "https://c.pxhere.com/photos/cb/9e/wallet_black_clutch_purse_leather_fashion_style_accessory-952715.jpg!d",
    "https://c.pxhere.com/photos/63/90/purse_handbag_fashion_bag_style_design_leather_accessory-780266.jpg!d",
    "https://c.pxhere.com/photos/2d/da/wallet_purple_wallet_purple_money_purse_billfold_lavender_fashion-863005.jpg!d",
    "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    "https://www.publicdomainpictures.net/pictures/60000/velka/leather-purse-isolated-background.jpg",
    "https://c.pxhere.com/photos/94/29/bag_handbag_purse_pink_red_fashion_glamour_accessory-952105.jpg!d",
    "https://c.pxhere.com/photos/9b/57/bag_purse_handbag_fashion_style_accessory_white-1336949.jpg!d",
  ];

  //-----------------Totes

  const HOME_titles = [
    "Plain White Cotton Tote",
    "Elegant Red Leather Tote",
    "Handmade Embroided White Tote with Red Roses",
    "Multicolored White Tote",
    "Owl White Cotton Tote",
    "Simple Grey Zipped Tote",
    "Earth Positive Tote Bag",
    "Deep Purple Handstamped Tote",
    "White Cotton Tote with Drawings",
    "Grey Wolf Tote",
    "Yellow and Green Bold Tote",
  ];
  const HOME_imgs = [
    "https://p1.pxfuel.com/preview/1021/986/529/bag-cotton-cotton-bag-textile-wall-white.jpg",
    "https://p1.pxfuel.com/preview/741/996/910/handbag-fashion-fashionable-woman.jpg",
    "https://p1.pxfuel.com/preview/58/205/88/shop-bag-bags-sale.jpg",
    "https://p1.pxfuel.com/preview/367/279/652/bag-bag-elephant-cloth-bag.jpg",
    "https://p0.pikrepo.com/preview/627/393/white-blue-and-red-owl-print-tote-bag.jpg",
    "https://farm5.staticflickr.com/4022/4714518639_8d9e06be13_b.jpg",
    "https://live.staticflickr.com/3538/3674472019_727d8c4669.jpg",
    "https://live.staticflickr.com/5161/5342130557_7fa8cc5935_b.jpg",
    "https://p1.pxfuel.com/preview/368/540/34/bag-cotton-natural-cotton-bag-advertising-royalty-free-thumbnail.jpg",
    "https://p1.pxfuel.com/preview/726/975/813/bag-handbag-womans-bag-sport-bag.jpg",
    "https://p1.pxfuel.com/preview/844/198/547/bag-burlap-advertising.jpg",
  ];

  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(WOMEN_titles, WOMEN_imgs, "WOMEN");
  await seedProducts(MEN_titles, MEN_imgs, "MEN");
  await seedProducts(KIDS_titles, KIDS_imgs, "KIDS");
  await seedProducts(BEAUTY_titles, BEAUTY_imgs, "BEAUTY");
  await seedProducts(ACCESSORIES_titles, ACCESSORIES_imgs, "ACCESSORIES");
  await seedProducts(HOME_titles, HOME_imgs, "HOME");

  await closeDB();
}

seedDB();
