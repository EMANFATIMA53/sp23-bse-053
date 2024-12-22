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

  //----------------------Backpacks
  const women_titles = [
    "printed khaddar straight shirt",
    "printed khaddar long jacket",
    "printed khaddar straight duppatta",
    "printed khaddar long jacket",
    "embroided raw silk shirt",
    "embroided raw silk",
    "embroided raw silk shirt",
    "block printed khaddar shirt",
    "3-piece embroide net suit",
    "printed khaddar shirt",
  ];
  const women_imgs = [
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

  //--------------------Travel Bags
  const men_titles = [
    "Tropical Fabric Waistcoat",
    "Wool Blended Suit",
    "Wash & Wear Suit",
    "Tropical Fabric Waistcoat",
    "Embroidered Wash & Wear Suit",
    "Embroidered Wash & Wear Suit",
    "Embroidered Wash & Wear Suit",
    "Embroidered Wash & Wear Suit",
    "Tropical Fabric Blazer",
    "Wash & Wear Suit",
    "Wash & Wear Suit",
  ];

  const men_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/MSTWC24IV530_4.jpg?v=1730807997&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2P24IV473_3.jpg?v=1730807279&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2PNSBLV26_4.jpg?v=1730807452&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MSTEWC24V529_5.jpg?v=1730807928&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MSTE2P24V589_3.jpg?v=1730807506&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2PNSBLV24_3.jpg?v=1730807430&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2PNSBLV25_1.jpg?v=1730807442&width=1200",
    "https://pk.sapphireonline.pk/cdn/shop/files/MSTE2P24V589_3.jpg?v=1730807506&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST-BL24IV5-6_1.jpg?v=1731652811&width=1024",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2P24IV484_5.jpg?v=1730807292&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/MST2P24IV458_3.jpg?v=1730807268&width=400",
  ];

  //--------------------Briefcases
  const kids_titles = [
    "Dyed Dobby Suit",
    "3 Piece - Embroidered Raw Silk ",
  ];

  const kids_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/2410-2BKS-1_5.jpg?v=1730281267&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/00024102GSF2_4.jpg?v=1730203727&width=400",
  ];

  //--------------------Mini Bags
  const beauty_titles = [
    "diamond glow",
    "xoxo",
    "explore",
    "momentum",
    
  ];
  const beauty_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/MNGO4299.jpg?v=1713160645&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/000000BML002_2.jpg?v=1727694162&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/DSC04022.jpg?v=1724155658&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/000000FRL072_2_efab5aaa-f1e2-4cd1-85dc-48adc6bbfa40.jpg?v=1729848072&width=600",
    
  ];

  //--------------------Large Handags

  const accessories_titles = [
    "charm",
    "horizon eyeshadow pallete",
    "pixie",
    "oomph",
    
  ];
  const accessories_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/POST3_2.jpg?v=1719585598&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/SmokeyGlow_1.jpg?v=1719584344&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/000000BML010_1.jpg?v=1727694328&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/OOMPH_561ee023-86a5-4af4-8d73-0b8db432b2d3.jpg?v=1706528222&width=1024",
    
  ];

  //-----------------------Purses
  const home_titles = [
    "Begonia - Quilt Cover",
    "Peach Pearl - Bed Spread",
    "Pearled Ivory - Quilt Cover",
    "Pastel Nectar - Bed Spread",
    
  ];
  const home_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/HTBLQC313285_2.jpg?v=1729079391&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/HTBLBT313278_1.jpg?v=1729079097&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/HTBLBT313269_1.jpg?v=1725620923&width=400",
    "https://pk.sapphireonline.pk/cdn/shop/files/HTBLBB313283_2.jpg?v=1729078733&width=400",
    
  ];

  //-----------------Totes

  const newin_titles = [
    "ribbed hoodie",
    "modest wear",
    "chunky cardigan",
    "ribbed cardigan",
    
  ];
  const newin_imgs = [
    "https://pk.sapphireonline.pk/cdn/shop/files/WBTM24V60089_2.jpg?v=1730875415&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/HIJAB24V7005_1.jpg?v=1731312247&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/WTOP24V60178.4.jpg?v=1730875538&width=600",
    "https://pk.sapphireonline.pk/cdn/shop/files/WTOP24V60177.1.jpg?v=1730875515&width=600",
    
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
          manufacturer: faker.company.companyName(0),
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

  await seedProducts(women_titles, women_imgs, "women");
  await seedProducts(men_titles, men_imgs, "men");
  await seedProducts(kids_titles, kids_imgs, "kids");
  await seedProducts(beauty_titles, beauty_imgs, "beauty");
  await seedProducts(
    accessories_titles,
    accessories_imgs,
    "accessories"
  );
  await seedProducts(home_titles, home_imgs, "home");
  await seedProducts(newin_titles, newin_imgs, "newin");

  await closeDB();
}

seedDB();
