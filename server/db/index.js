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
  updateUser,
  updateSelf
} = require('./users');

const {
  createTag,
  createTag_line,
  fetchTags,
  fetchTag_lines,
  deleteTag_line
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
  createWishList,
  fetchWishList,
  removeWishList,
  fetchAllWishLists
} = require('./wishlist');

const {
  createAddress,
  fetchAddresses,
  fetchAllAddresses
} = require('./address');
  
const {
  createBookmark,
  fetchBookmarks,
  removeBookmarks
} = require('./bookmarks');


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
    
    DROP TABLE IF EXISTS wishlist_items;
    DROP TABLE IF EXISTS wishlists;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS bookmarks;
    DROP TABLE IF EXISTS tag_lines;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS tags;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      avatar TEXT
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

    CREATE TABLE addresses(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      data JSON DEFAULT '{}',
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id),
      address_id UUID references addresses(id)
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );
    
    CREATE TABLE bookmarks(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      CONSTRAINT product_and_user_pair UNIQUE(product_id, user_id)
    );
    
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      text VARCHAR(255),
      product_id UUID REFERENCES products(id) NOT NULL,
      rating SMALLINT
    );

    CREATE TABLE wishlist_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT product_and_user_key UNIQUE(product_id, user_id)
    );

    CREATE TABLE tags(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL
    );
    
    CREATE TABLE tag_lines(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      tag_id UUID REFERENCES tags(id) NOT NULL
    );


  `;
  await client.query(SQL);

  const [moe, lucy, ethyl, matt] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false, is_vip: true}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false, is_vip: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip: true}),
    createUser({ username: 'matt', password: 'matt', is_admin: true, is_vip: true})
  ]);

  const godfatherImage = await loadImage('/images/godfather.png');
  const starwarsImage = await loadImage('/images/starwars.png');
  const landbeforetimeImage = await loadImage('/images/landbeforetime.png');
  const topgunImage = await loadImage('/images/topgun.png');
  const scarfaceImage = await loadImage('/images/scarface.png');
  const vcrImage = await loadImage('/images/vcr.png');
  const matrixImage = await loadImage('/images/thematrix.png');
  const princessBrideImage = await loadImage('/images/princessbride.png');
  const fridayThe13thImage = await loadImage('/images/fridaythe13th.png');
  const spaceballsImage = await loadImage('/images/spaceballs.png');
  const spaceJamImage = await loadImage('/images/spacejam.png');
  const barneyImage = await loadImage('/images/barney.png');
  const halloweenImage = await loadImage('/images/halloween.png');
  const vertigoImage = await loadImage('/images/vertigo.png');
  const freakyfridayImage = await loadImage('/images/freakyfriday.png');
  const irongiantImage = await loadImage('/images/irongiant.png');
  const armageddonImage = await loadImage('/images/armageddon.png');
  const pokemonImage = await loadImage('/images/pokemonfirstmovie.png');
  const titanicImage = await loadImage('/images/titanic.png');
  const theroomImage = await loadImage('/images/theroom.png');
  const vanhelsingImage = await loadImage('/images/vanhelsing.png');
  const hellboyImage = await loadImage('/images/hellboy.png');
  const nationaltreasureImage = await loadImage('/images/nationaltreasure.png');
  const robinhoodImage = await loadImage('/images/robinhood.png');
  const goodfellasImage = await loadImage('/images/goodfellas.png');
  const montypythonhgImage = await loadImage('/images/montypython.png');
  const americanpieImage = await loadImage('/images/americanpie.png');
  const fightclubImage = await loadImage('/images/fightclub.png');
  const oceans11Image = await loadImage('/images/oceans11.png');
  const clueImage = await loadImage('/images/clue.png');
  const anacondaImage = await loadImage('/images/anaconda.png');
  const neverendingstoryImage = await loadImage('/images/neverendingstory.png');
  const pulpfictionImage = await loadImage('/images/pulpfiction.png');
  const gonein60Image = await loadImage('/images/gonein60.png');
  const scarymovie2Image = await loadImage('/images/scarymovie2.png');
  const caddyshackImage = await loadImage('/images/caddyshack.png');
  const blazingsaddlesImage = await loadImage('/images/blazingsaddles.png');
  const captainamericaImage = await loadImage('/images/captainamerica.png');

  const seedAddresses = await Promise.all([
    createAddress(
      {
        data: {
          "formatted_address": "San Diego, CA, USA",
          "geometry": {
              "location": {
                  "lat": 32.715738,
                  "lng": -117.1610838
              },
              "viewport": {
                  "south": 32.534855982486,
                  "west": -117.3097969462756,
                  "north": 33.11424900445905,
                  "east": -116.9081599711481
              }
          },
          "html_attributions": []
      },
        user_id: ethyl.id
    }),
    createAddress(
      {
        data: {
          "formatted_address": "New York, NY 10004, USA",
          "geometry": {
              "location": {
                  "lat": 40.6892494,
                  "lng": -74.04450039999999
              },
              "viewport": {
                  "south": 40.6796167,
                  "west": -74.06015684999998,
                  "north": 40.71814749999999,
                  "east": -73.99753105
              }
          },
          "html_attributions": []
      },
        user_id: moe.id
    }),
    createAddress(
      {
        data: {
          "formatted_address": "Yellowstone National Park, WY 82190, USA",
          "geometry": {
              "location": {
                  "lat": 44.4279684,
                  "lng": -110.5884542
              },
              "viewport": {
                  "south": 44.4199995899322,
                  "west": -110.6044616237714,
                  "north": 44.43593612381056,
                  "east": -110.5724467762286
              }
          },
          "html_attributions": []
      },
        user_id: lucy.id
    })
  ]);

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
    createProduct({ 
      name: 'The Matrix',
      price: 2999, 
      description: `(1999) Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker
       known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted 
       by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel 
       against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire 
       human rebellion.`,
      image: matrixImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'The Princess Bride',
      price: 2799, 
      description: `(1987) A kindly grandfather sits down with his ill grandson and reads him a story. The story is one that has been passed 
      down from father to son for generations. As the grandfather reads the story, the action comes alive. The story is a classic tale of love 
      and adventure as the beautiful Buttercup, engaged to the odious Prince Humperdinck, is kidnapped and held against her will in order to 
      start a war, It is up to Westley (her childhood beau, now returned as the Dread Pirate Roberts) to save her. On the way he meets a thief 
      and his hired helpers, an accomplished swordsman and a huge, super strong giant, both of whom become Westley's companions in his quest.`,
      image: princessBrideImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Friday the 13th',
      price: 2499, 
      description: `(1980) In 1957, a young boy named Jason drowns in a lake near Camp Crystal Lake. The next year, two counselors are murdered. 
      In 1980, a descendant of the original owners reopens Camp Crystal Lake with some counselors' help. The counselors gets killed one by one by a 
      mysterious person. Could it be Jason, out for revenge?`,
      image: fridayThe13thImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Spaceballs',
      price: 2499, 
      description: `(1987) On the peaceful planet Druidia, King Roland attempts to marry his daughter Princess Vespa to Prince Valium, but Vespa and 
      her loyal droid Dot Matrix escape during her wedding. After wasting the fresh air on the distant planet Spaceball, corrupt President Skroob orders 
      the arch-villain henchman Dark Helmet to kidnap Princess Vespa to force King Roland to provide them with the code to Druidia's atmosphere. Under those 
      circumstances, the seasoned mercenary Lone Starr and his devoted half-human, half-canine sidekick Barf try to save the princess. In the meantime, the 
      ruthless loan shark Pizza the Hutt is after them. But only he who can harness The Schwartz, a mystical cosmic force, will save the day`,
      image: spaceballsImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Space Jam',
      price: 1999, 
      description: `(1996) Swackhammer, owner of the amusement park planet Moron Mountain is desperate get new attractions and he decides that the Looney 
      Tune characters would be perfect. He sends his diminutive underlings to get them to him, whether Bugs Bunny and Co. want to go or not. Well armed 
      for their size, Bugs Bunny is forced to trick them into agreeing to a competition to determine their freedom. Taking advantage of their puny and 
      stubby legged foes, the gang selects basketball for the surest chance of winning. However, the Nerdlucks turn the tables and steal the talents of 
      leading professional basketball stars to become massive basketball bruisers known as the Monstars. In desperation, Bugs Bunny calls on the aid of 
      Michael Jordan, the Babe Ruth of basketball, to help them have a chance at winning their freedom.`,
      image: spaceJamImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Barney: Best Manners',
      price: 1499, 
      description: `(2003) When a surprise package arrives from Miss Vera Goode with her new "Book of Manners for Children," Barney's friends question 
      why minding their manners is so important. Barney explains that they have the perfect opportunity to be on their best behavior because they're 
      invited to a party!`,
      image: barneyImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Halloween',
      price: 2299, 
      description: `(1978) The year is 1963, the night: Halloween. Police are called to 43 Lampkin Ln. only to discover that 15-year-old Judith Myers 
      has been stabbed to death by her 6-year-old brother, Michael. After being institutionalized for 15 years, Myers breaks out on the night before 
      Halloween. No one knows, nor wants to find out, what will happen on October 31st 1978, besides Myers' psychiatrist, Dr. Loomis. He knows Michael 
      is coming back to Haddonfield, but by the time the town realizes it, it'll be too late for many people.`,
      image: halloweenImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Vertigo',
      price: 3299, 
      description: `(1958) Strange as it may sound, whenever former police detective John "Scottie" Ferguson looks down from a high place or even gets 
      more than a few centimetres above the ground, he triggers an extreme, almost irrational fear of falling. Having all the time in the world to enjoy 
      his early retirement, Scottie is reluctantly back in the game when Gavin Elster, an old acquaintance from college and shipowner magnate, enlists his 
      help to shed light on the disturbing behaviour of Madeleine, his icy, remote wife. However, as the intrigued friend follows unsuspecting Madeleine's 
      every move, more and more, a dangerous attraction teetering on the brink of obsession begins to form. Can Madeleine's mystery and John's fixation stand 
      in the way of love? Above all, why do we crave what we can't have?
      `,
      image: vertigoImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Freaky Friday',
      price: 1999, 
      description: `(2003) The wide generation gap between Tess Coleman and her teenage daughter Anna is more than evident. They simply cannot understand each 
      other's preferences. On a Thursday night they have a big argument in a Chinese restaurant. Both receive a fortune cookie each from the restaurant owner's 
      mother which causes them to switch bodies next day. As they adjust with their new personalities, they begin to understand each other more and eventually 
      it's the mutual self-respect that sorts the things out.`,
      image: freakyfridayImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'The Iron Giant',
      price: 2699, 
      description: `(1999) This is the story of a nine-year-old boy named Hogarth Hughes who makes friends with an innocent alien giant robot that came from outer 
      space. Meanwhile, a paranoid U.S. Government agent named Kent Mansley arrives in town, determined to destroy the giant at all costs. It's up to Hogarth to 
      protect him by keeping him at Dean McCoppin's place in the junkyard.`,
      image: irongiantImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Armageddon',
      price: 2999, 
      description: `(1998) A shuttle's unfortunate demise in outer space alerts NASA to a doomsday asteroid that is on a collision course with Earth. it seems 
      that the only way to knock it off course is to drill into its surface and detonate a nuclear weapon. But as NASA's underfunded yet resourceful team 
      trains the world's best drillers for the job, the world's social order begins to break down as the information reaches the public and hysteria results. 
      As high-ranking officials play politics with the effort, members of the drilling team face deep personal issues that might jeopardize humanity's last 
      chance`,
      image: armageddonImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Pokémon: The First Movie - Mewtwo Strikes Back',
      price: 4999, 
      description: `(1998) When a group of scientists are offered funding into genetic research if they agree to try and clone the greatest ever Pokémon, Mew, 
      the end result is success and Mewtwo is born. However Mewtwo is bitter about his purpose in life and kills his masters. In order to become the greatest 
      he throws open a challenge to the world to battle him and his Pokémon. Ash and his friends are one of the few groups of trainers who pass the first test
       and prepare for battle. However they soon find out about further cloning and Mewtwo's ultimate plan for the earth.`,
      image: pokemonImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Titanic',
      price: 3499, 
      description: `(1997) 84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, 
      Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship 
      with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best 
      friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last 
      voyage April 15th, 1912 at 2:20 in the morning.`,
      image: titanicImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'The Room',
      price: 999, 
      description: `(2003) In San Francisco, Johnny's live-in fiancee of seven years, Lisa, has been cheating on him with his friend Mark, and Johnny doesn't know. If 
      Johnny ever found out, would Mark still be his best friend? And what other troubles lurk in his life?`,
      image: theroomImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Van Helsing',
      price: 1999, 
      description: `(2004) Van Helsing is in the world to rid all evil, even if not everyone agrees with him. The Vatican sends the monster hunter and his ally, Carl, 
      to Transylvania. They have been sent to this land to stop the powerful Count Dracula. Whilst there they join forces with a Gypsy Princess called Anna Valerious, 
      who is determined to end an ancient curse on her family by destroying the vampire. They just don't know how!`,
      image: vanhelsingImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Hellboy',
      price: 2999, 
      description: `(2004) Spawned in Hell's fiery pits, Hellboy--a scarlet-skinned, cigar-chomping, gun-toting, hornless demon--is humankind's unlikely defender. 
      Indeed, the infernal avenger is our last hope; after all, he's been battling the same evil forces since forever, expecting nothing in return. And after 
      thwarting Adolf Hitler's 1944 occult scheme, Hellboy and his equally exotic brothers-in-arms must now avert the destructive plans of a dangerous, 
      long-forgotten adversary: Grigory Rasputin, the sinister Russian mystic. Once more, the world's future is at stake. Can the hellish hero from below save 
      the day?`,
      image: hellboyImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'National Treasure',
      price: 2699, 
      description: `(2004) Benjamin Franklin Gates descends from a family of treasure-seekers who've all hunted for the same thing: a war chest hidden by the Founding 
      Fathers after the Revolutionary War. Ben's close to discovering its whereabouts, as is his competition, but the FBI is also hip to the hunt.`,
      image: nationaltreasureImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Robin Hood: Men in Tights',
      price: 2299, 
      description: `(1993) After escaping death by the skin of his teeth while venturing with Kind Richard to the Crusades, noble Robin of Loxley returns to England. 
      With the kingdom in disarray, at the mercy of Prince John and his wicked right-hand man, Sheriff of Rottingham, Robin, Little John, and the Merry Men in 
      tights must take matters into their own hands, and rid the realm of the hideous usurper. As the forces of evil, led by Don Giovanni, plot to assassinate 
      Robin during the crowd-pleasing archery tournament of the Spring Festival, graceful Maid Marian, too, is on a challenging quest for freedom. Can Robin teach 
      Prince John a lesson, free the land, and in the process, find love?`,
      image: robinhoodImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Goodfellas',
      price: 3299, 
      description: `(1990) Henry Hill might be a small time gangster, who may have taken part in a robbery with Jimmy Conway and Tommy De Vito, two other gangsters who 
      might have set their sights a bit higher. His two partners could kill off everyone else involved in the robbery, and slowly start to think about climbing up 
      through the hierarchy of the Mob. Henry, however, might be badly affected by his partners' success, but will he consider stooping low enough to bring about the downfall of 
      Jimmy and Tommy?`,
      image: goodfellasImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Monty Python and the Holy Grail',
      price: 3999, 
      description: `(1975) History is turned on its comic head when, in tenth-century England, King Arthur travels the countryside to find knights who will join him at the Round 
      Table in Camelot. Gathering up the men is a tale in itself but after a bit of a party at Camelot, many decide to leave only to be stopped by God, who sends 
      them on a quest: to find the Holy Grail. After a series of individual adventures, the knights are reunited but must face a wizard named Tim the Enchanter, killer 
      rabbits and lessons in the use of holy hand grenades. Their quest comes to an end however when the Police intervene - just what you would expect in a Monty Python movie`,
      image: montypythonhgImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'American Pie',
      price: 2999, 
      description: `(1999) Jim, Oz, Finch and Kevin are four friends who make a pact that before they graduate they will all lose their virginity. The hard job now is how to reach 
      that goal by prom night. Whilst Oz begins singing to grab attention and Kevin tries to persuade his girlfriend, Finch tries any easy route of spreading rumors and Jim fails 
      miserably. Whether it is being caught on top of a pie or on the Internet, Jim always ends up with his trusty sex advice from his father. Will they achieve their goal of 
      getting laid by prom night? Or will they learn something much different?`,
      image: americanpieImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Fight Club',
      price: 3799, 
      description: `(1999) A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac 
      state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he 
      associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage 
      in competitive rivalry for love and power.`,
      image: fightclubImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: `Ocean's Eleven`,
      price: 2499, 
      description: `(2001) Danny Ocean wants to score the biggest heist in history. He combines an eleven member team, including Frank Catton, Rusty Ryan and Linus 
      Caldwell. Their target? The Bellagio, the Mirage and the MGM Grand. All casinos owned by Terry Benedict. It's not going to be easy, as they plan to get in 
      secretly and out with $150 million.`,
      image: oceans11Image,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Clue',
      price: 1999, 
      description: `(1985) Six guests with colorful surnames attend a dinner party hosted by a butler and a maid. All are connected in some secret, humiliating 
      manner, and all are being blackmailed. When the blackmailer arrives, the butler reveals that he arranged the evening, intending to kill the blackmailer 
      with his guests' help. But the blackmailer turns the tables, saying that their secrets will be exposed unless they kill the butler. The lights go out, and 
      when they come back on, the blackmailer lies dead - but who killed him? And how?`,
      image: clueImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Anaconda',
      price: 1599, 
      description: `(1997) When a documentary crew traveling through the Amazon jungle, picks up a stranded man, they are unaware of the trouble that will occur. 
      This stranger's hobby is to capture the giant Anaconda snake, and plans to continue targeting it on their boat, by any means necessary`,
      image: anacondaImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'The NeverEnding Story',
      price: 1999, 
      description: `(1984) Bastian is a young boy who lives a dreary life being tormented by school bullies. On one such occasion he escapes into a book shop where 
      the old proprieter reveals an ancient story-book to him, which he is warned can be dangerous. Shortly after, he "borrows" the book and begins to read it in 
      the school attic where he is drawn into the mythical land of Fantasia, which desperately needs a hero to save it from destruction`,
      image: neverendingstoryImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Pulp Fiction',
      price: 3999, 
      description: `(1994) Jules Winnfield and Vincent Vega are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus 
      Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging 
      boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre 
      and uncalled-for incidents.`,
      image: pulpfictionImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Scary Movie 2',
      price: 1899, 
      description: `(2001) A group of teens including Cindy Campbell and Brenda Meeks are invited to spend a night in Hell House. 
      Professor Oldman has convinced them it is for a school project, but the night won't go past quietly. Master Kane is long dead, 
      but still plans on enjoying himself, especially with Alex Monday. When things really start getting bad, the gang must work together to 
      find a way to capture this ghostly menace.`,
      image: scarymovie2Image,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Gone in 60 Seconds',
      price: 1999, 
      description: `(2000) In exchange for his little brother's life, the reformed car thief, Randall "Memphis" Raines, has to do the impossible: in less than three days, 
      he has to steal not one, but fifty exotic supercars for the ruthless crime lord, Ray Calitri. To stand a chance of pulling off this intricate and time-sensitive grand 
      theft auto, once more, Memphis has to rely on his old gang--his knowledgeable mentor, Otto; the old friends, Sphinx and Donny; his reluctant ex-girlfriend, Sway, and a band of 
      tech-savvy young thieves--however, the police are already onto them. Now, fast Lamborghinis, precious Ferraris, luxurious Porsches, and Eleanor--a rare Ford Shelby Mustang 
      GT500--are just some of the cars in Raines' long list. Can Memphis execute the perfect car heist?`,
      image: gonein60Image,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Caddyshack',
      price: 2299, 
      description: `(1980) Something fishy is going on at the elitist Bushwood Country Club, and the scheming president of the clubhouse, Judge Elihu Smails, has something to do with it. 
      But suave golf guru Ty Webb and distasteful, filthy rich construction magnate Al Czervik are on to him. Meanwhile, young caddie Danny Noonan struggles to get 
      his life back on track, and the only way to do it is by winning the demanding Caddie Day golf tournament, a prestigious competition that can earn him a scholarship 
      from the judge himself. Now, war breaks out and all bets are off. Will Danny ever make his dream come true? Does he know that a subterranean menace is threatening to put 
      in jeopardy everyone's plans?`,
      image: caddyshackImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Blazing Saddles',
      price: 2499, 
      description: `(1974) A town where everyone seems to be named Johnson is in the way of the railroad. In order to grab their land, Hedley Lemar, a politically connected nasty 
      person, sends in his henchmen to make the town unlivable. After the sheriff is killed, the town demands a new sheriff from the Governor. Hedley convinces him to 
      send the town its first sheriff.`,
      image: blazingsaddlesImage,
      vip_only: false,
      is_bookmarked: false
    }),
    createProduct({ 
      name: 'Captain America',
      price: 2999, 
      description: `(1990) During World War II, a brave, patriotic American Soldier undergoes experiments to become a new supersoldier, "Captain America." 
      Racing to Germany to sabotage the rockets of Nazi baddie "Red Skull", Captain America winds up frozen until the 1990s. He reawakens to find that the 
      Red Skull has changed identities and is now planning to kidnap the President of the United States.`,
      image: captainamericaImage,
      vip_only: false,
      is_bookmarked: false
    })
  ]);

  const seedTags = await Promise.all([
    createTag({ name: 'Family Friendly'}),
    createTag({ name: 'Classic'}),
    createTag({ name: 'Sci-Fi'}),
    createTag({ name: 'Crime'}),
    createTag({ name: 'Hardware'}),
    createTag({ name: 'Romance'}),
    createTag({ name: 'Fantasy'}),
    createTag({ name: 'Horror'}),
    createTag({ name: 'Comedy'}),
    createTag({ name: 'Animation'}),
    createTag({ name: 'Kids'}),
    createTag({ name: 'Mystery'}),
    createTag({ name: 'Thriller'}),
    createTag({ name: 'Action/Adventure'}),
    createTag({ name: 'Historical'}),
    createTag({ name: 'Drama'}),
    createTag({ name: 'Western'}),
    createTag({ name: 'Collection'}),
    createTag({ name: 'Sports'}),
    createTag({ name: 'Parody'})
  ]);

  const seedTagLines = await Promise.all([
    createTag_line({ product_id: seedData[0].id, tag_id: seedTags[4].id}),
    createTag_line({ product_id: seedData[1].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[1].id, tag_id: seedTags[1].id}),
    createTag_line({ product_id: seedData[1].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[2].id, tag_id: seedTags[2].id}),
    createTag_line({ product_id: seedData[2].id, tag_id: seedTags[17].id}),
    createTag_line({ product_id: seedData[3].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[3].id, tag_id: seedTags[9].id}),
    createTag_line({ product_id: seedData[3].id, tag_id: seedTags[1].id}),
    createTag_line({ product_id: seedData[3].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[4].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[4].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[5].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[5].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[6].id, tag_id: seedTags[2].id}),
    createTag_line({ product_id: seedData[6].id, tag_id: seedTags[1].id}),
    createTag_line({ product_id: seedData[6].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[7].id, tag_id: seedTags[5].id}),
    createTag_line({ product_id: seedData[7].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[8].id, tag_id: seedTags[7].id}),
    createTag_line({ product_id: seedData[8].id, tag_id: seedTags[11].id}),
    createTag_line({ product_id: seedData[8].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[9].id, tag_id: seedTags[2].id}),
    createTag_line({ product_id: seedData[9].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[10].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[10].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[10].id, tag_id: seedTags[9].id}),
    createTag_line({ product_id: seedData[10].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[11].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[11].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[12].id, tag_id: seedTags[7].id}),
    createTag_line({ product_id: seedData[12].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[13].id, tag_id: seedTags[5].id}),
    createTag_line({ product_id: seedData[13].id, tag_id: seedTags[11].id}),
    createTag_line({ product_id: seedData[13].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[14].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[14].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[14].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[14].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[15].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[15].id, tag_id: seedTags[9].id}),
    createTag_line({ product_id: seedData[15].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[15].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[16].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[16].id, tag_id: seedTags[2].id}),
    createTag_line({ product_id: seedData[16].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[17].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[17].id, tag_id: seedTags[9].id}),
    createTag_line({ product_id: seedData[17].id, tag_id: seedTags[10].id}),
    createTag_line({ product_id: seedData[18].id, tag_id: seedTags[14].id}),
    createTag_line({ product_id: seedData[18].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[19].id, tag_id: seedTags[5].id}),
    createTag_line({ product_id: seedData[19].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[20].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[20].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[21].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[21].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[22].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[22].id, tag_id: seedTags[11].id}),
    createTag_line({ product_id: seedData[22].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[23].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[23].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[24].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[24].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[25].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[25].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[26].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[27].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[27].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[27].id, tag_id: seedTags[1].id}),
    createTag_line({ product_id: seedData[28].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[28].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[28].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[29].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[29].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[29].id, tag_id: seedTags[11].id}),
    createTag_line({ product_id: seedData[30].id, tag_id: seedTags[7].id}),
    createTag_line({ product_id: seedData[30].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[31].id, tag_id: seedTags[0].id}),
    createTag_line({ product_id: seedData[31].id, tag_id: seedTags[6].id}),
    createTag_line({ product_id: seedData[31].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[32].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[32].id, tag_id: seedTags[1].id}),
    createTag_line({ product_id: seedData[32].id, tag_id: seedTags[15].id}),
    createTag_line({ product_id: seedData[33].id, tag_id: seedTags[7].id}),
    createTag_line({ product_id: seedData[33].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[33].id, tag_id: seedTags[19].id}),
    createTag_line({ product_id: seedData[34].id, tag_id: seedTags[3].id}),
    createTag_line({ product_id: seedData[34].id, tag_id: seedTags[12].id}),
    createTag_line({ product_id: seedData[34].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[35].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[35].id, tag_id: seedTags[18].id}),
    createTag_line({ product_id: seedData[36].id, tag_id: seedTags[8].id}),
    createTag_line({ product_id: seedData[36].id, tag_id: seedTags[16].id}),
    createTag_line({ product_id: seedData[37].id, tag_id: seedTags[13].id}),
    createTag_line({ product_id: seedData[37].id, tag_id: seedTags[2].id})
  ]);

  const seedReviews = await Promise.all([
    createReviews({ text: 'Would recommend.', product_id: seedData[1].id, rating: 5 }),
    createReviews({ text: 'Excellent movie.', product_id: seedData[1].id, rating: 5 }),
    createReviews({ text: 'Great movies.', product_id: seedData[2].id, rating: 3 }),
    createReviews({ text: 'Definitely a good one.', product_id: seedData[3].id, rating: 4 }),
    createReviews({ text: 'Watched it twice.', product_id: seedData[4].id, rating: 2 }),
    createReviews({ text: 'You gotta watch this one.', product_id: seedData[5].id, rating: 1 })
  ]);
  
  const seedBookmarks = await Promise.all([
    createBookmark({ user_id: ethyl.id, product_id: seedData[1].id }),
    createBookmark({ user_id: ethyl.id, product_id: seedData[3].id }),
    createBookmark({ user_id: moe.id, product_id: seedData[4].id })
  ]);
  
 const seedWishList = await Promise.all([
    createWishList({user_id: ethyl.id, product_id: seedData[2].id}),
    createWishList({user_id: ethyl.id, product_id: seedData[1].id}),
    createWishList({user_id: moe.id, product_id: seedData[1].id})
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  
  let lineItem = await createLineItem({ order_id: cart.id, product_id: seedData[1].id });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: seedData[2].id });
  cart = {...cart, is_cart: false, address_id: seedAddresses[0].id};
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct,
  fetchTags,
  fetchTag_lines,
  createTag,
  createTag_line,
  deleteTag_line,
  fetchOrders,
  fetchAllOrders,
  fetchUsers,
  fetchReviews,
  fetchBookmarks,
  createBookmark,
  removeBookmarks,
  createReviews,
  createUser,
  fetchAddresses,
  fetchAllAddresses,
  createAddress,
  updateUser,
  updateSelf,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchWishList,
  fetchAllWishLists,
  createWishList,
  removeWishList,
  authenticate,
  findUserByToken,
  seed,
  client
};
