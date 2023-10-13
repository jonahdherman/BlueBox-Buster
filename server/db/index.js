const client = require('./client');
const path = require('path');
const fs = require('fs');

const {
  fetchReviews,
  createReviews
} = require('./reviews');

const {
  fetchProducts,
  createProduct,
  updateProduct
} = require('./products');

const {
  fetchUsers,
  createUser,
  updateUser
} = require('./users');

const {
  createTag,
  createTag_line
} = require('./tags');

const {
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
  fetchAllOrders
} = require('./cart');

const {
  fetchWishListItems,
  fetchAllWishListItems,
  createWishListItem,
  updateWishListItem,
  deleteWishListItem
} = require('./wishlist');

const loadImage = (filePath) => {
  return new Promise((resolve, reject)=>{
  const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, 'base64', (err, result)=> {
      if (err) {
        reject(err)
      }
      else {
        resolve(`data:image/png;base64,${result}`)
      }
    });
  });
  
}

const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS tag_lines;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS tags;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER DEFAULT 1 NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      vip_only BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );
    
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      text VARCHAR(255),
      product_id UUID REFERENCES products(id) NOT NULL,
      rating SMALLINT
    );

    CREATE TABLE tags(
      id UUID PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE tag_lines(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      tag_id UUID REFERENCES tags(id) NOT NULL
    );


  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false, is_vip: true}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false, is_vip: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip: true})
  ]);

  const godfatherImage = await loadImage('/images/godfather.png');
  const starwarsImage = await loadImage('/images/starwars.png');
  const landbeforetimeImage = await loadImage('/images/landbeforetime.png');
  const topgunImage = await loadImage('/images/topgun.png');
  const scarfaceImage = await loadImage('/images/scarface.png');
  const vcrImage = await loadImage('/images/vcr.png');

  const seedData = await Promise.all([
    createProduct({
      name: 'VHS System', 
      price: 14999, 
      description: `Stereo VHS VCR available in excellent working condition. 
      You can't watch any of these classics without one of these bad boys!
      The video tape heads have been manually cleaned and it works perfectly.
      It comes with the Remote Control and Audio / Video TV connection cables.
      The user manual is widely available to view, print or download online.`, 
      image: vcrImage,
      vip_only: false
     }),
    createProduct({
       name: 'The Godfather', 
       price: 2999, 
       description: `(1972) The Godfather "Don" Vito Corleone is the head of the Corleone mafia family in New York. 
       He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine 
       is also present at the wedding. Michael seems to be uninterested in being a part of the family business. 
       Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who 
       do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for 
       the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways
       which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the
       other mafia families which could tear the Corleone family apart.`, 
       image: godfatherImage,
       vip_only: true
      }),
    createProduct({ 
      name: 'Star Wars: Original Trilogy', 
      price: 9999, 
      description: `(1977-1983) The original trilogy is the first installment of films of the Star Wars saga to be 
      produced. These were the movies released from 1977 to 1983. They primarily focus on the Rebel Alliance trying 
      to free the galaxy from the clutches of the Galactic Empire, as well as Luke Skywalker's quest to become a 
      Jedi and face Sith Lord Darth Vader and his master Darth Sidious.`,
      image: starwarsImage,
      vip_only: true
    }),
    createProduct({ 
      name: 'The Land Before Time', 
      price: 1999, 
      description: `(1988) An orphaned brontosaurus named Littlefoot sets off in search of the legendary Great Valley. 
      A land of lush vegetation where the dinosaurs can thrive and live in peace. Along the way he meets four other 
      young dinosaurs, each one a different species, and they encounter several obstacles and the evil predator 
      Sharptooth as they learn to work together in order to survive`,
      image: landbeforetimeImage,
      vip_only: false
    }),
    createProduct({ 
      name: 'Top Gun',
      price: 2499, 
      description: `(1986) US Navy Lieutenant Pete Mitchell, call sign Maverick--an impetuous, daredevil pilot 
      ace--is accepted into Top Gun, Miramar's elite Fighter School. But there, the impulsive young pilot will have 
      to compete with the best of the best, including Iceman, a brilliant and highly competitive fellow student.
      Now, Mitchell must give his all; however, his father's mysterious and untimely demise still haunts him. 
      Can Maverick prove his worth to Charlie, the flying school's no-nonsense astrophysics instructor? Will he be 
      able to suppress his wild nature to win the prestigious Top Gun Trophy?`,
      image: topgunImage,
      vip_only: false
    }),
    createProduct({ 
      name: 'Scarface',
      price: 3499, 
      description: `(1983) Tony Montana manages to leave Cuba during the Mariel exodus of 1980. He finds himself in a Florida
      refugee camp but his friend Manny has a way out for them: undertake a contract killing and arrangements will be
      made to get a green card. He's soon working for drug dealer Frank Lopez and shows his mettle when a deal with 
      Colombian drug dealers goes bad. He also brings a new level of violence to Miami. Tony is protective of his 
      younger sister but his mother knows what he does for a living and disowns him. Tony is impatient and wants 
      it all however, including Frank's empire and his mistress Elvira Hancock. Once at the top however, Tony's 
      outrageous actions make him a target and everything comes crumbling down.`,
      image: scarfaceImage,
      vip_only: false
    }),
  ]);

  const [familyFriendly, classic, scifi, crime, hardware] = await Promise.all([
    createTag({ name: 'Family Friendly'}),
    createTag({ name: 'Classic'}),
    createTag({ name: 'Sci-Fi'}),
    createTag({ name: 'Crime'}),
    createTag({ name: 'Hardware'})
  ]);

  const [vhs_tag, godfather_tag1, godfather_tag2, starwars_tag, lbt_tag] = await Promise.all([
    createTag_line({ product_id: seedData[0].id, tag_id: hardware.id}),
    createTag_line({ product_id: seedData[1].id, tag_id: classic.id}),
    createTag_line({ product_id: seedData[1].id, tag_id: crime.id}),
    createTag_line({ product_id: seedData[2].id, tag_id: scifi.id}),
    createTag_line({ product_id: seedData[3].id, tag_id: familyFriendly.id})
  ]);
  console.log(seedData[1])

  const seedReviews = await Promise.all([
    createReviews({ text: 'Would recommend.', product_id: seedData[1].id, rating: 5 }),
    createReviews({ text: 'Excellent movie.', product_id: seedData[1].id, rating: 5 }),
    createReviews({ text: 'Great movies.', product_id: seedData[2].id, rating: 3 }),
    createReviews({ text: 'Definitely a good one.', product_id: seedData[3].id, rating: 4 }),
    createReviews({ text: 'Watched it twice.', product_id: seedData[4].id, rating: 2 }),
    createReviews({ text: 'You gotta watch this one.', product_id: seedData[5].id, rating: 1 })
  ]);
  
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: seedData[1].id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: seedData[2].id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct,
  createTag,
  createTag_line,
  fetchOrders,
  fetchAllOrders,
  fetchUsers,
  fetchReviews,
  createReviews,
  createUser,
  updateUser,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchWishListItems,
  fetchAllWishListItems,
  createWishListItem,
  updateWishListItem,
  deleteWishListItem,
  authenticate,
  findUserByToken,
  seed,
  client
};
