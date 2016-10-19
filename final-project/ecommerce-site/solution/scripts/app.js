class App {

  constructor() {
    this.data = appData;
    this.templatize('#tmpl-main-posts', '#top-posts', this.data, 'top_posts');
    this.templatize('#tmpl-product', '#product-of-the-month', this.data, 'product');
    this.templatize('#tmpl-main-posts', '#todays-posts', this.data, 'todays_posts');
    this.templatize('#tmpl-list-posts', '#list-posts', this.data, 'hot_list');
    // Control flash of unstyled content in the page as templates load
    // When body has .unresolved it will be display: none;
    document.body.classList.remove('unresolved');

    this.addEventListeners();
  }

  templatize(tmplID, hostID, data, section) {
    var tmpl = Handlebars.compile(document.querySelector(tmplID).innerHTML);
    var context = data[section];
    context.section = section;
    var html = tmpl(context);
    document.querySelector(hostID).innerHTML = html;
  }

  addEventListeners() {
    Array.from(document.querySelectorAll('.btn'))
      .forEach(function(btn) {
        btn.addEventListener('click', function() {
          alert(
            'Oh hi! This is just a sample button. It doesn\'t do anything :)'
          );
        });
      });
  }

}

var appData = {
  "top_posts": {
    "posts": [{
      "tag": "Food",
      "img": "images/food.jpg",
      "img_alt": "A pile of citrus fruits, mostly limes and lemons",
      "title": "Eat Fresh Every Day",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Nature",
      "img": "images/nature.jpg",
      "img_alt": "A man diving into a pool of water with his arms outstretched",
      "title": "Dive Into The Water",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }]
  },
  "product": {
    "img": "images/coffee-cups.jpg",
    "img_alt": "A square wooden frame holding an antinque coffee pot. Three antique coffee cups hang off of the frame.",
    "title": "Vintage Coffee Cups",
    "price": "$123.15"
  },
  "todays_posts": {
    "posts": [{
      "tag": "Architecture",
      "img": "images/architecture.jpg",
      "img_alt": "Several intersecting glass and steel structures shot against a blue sky",
      "title": "Wonderful Buildings",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Decoration",
      "img": "images/decoration.jpg",
      "img_alt": "A wall with wood planks containing old framed images, a sports coat, and boat oar",
      "title": "Warm Moments",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Traveling",
      "img": "images/travelling.jpg",
      "img_alt": "A photograph of the back of a train as it rounds a mountain",
      "title": "Explore the World",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Photography",
      "img": "images/photography.jpg",
      "img_alt": "A hand holding a camera lens with a large lake and mountain scene viewed through the lens",
      "title": "Capture The Scene",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Music",
      "img": "images/music.jpg",
      "img_alt": "A band playing in a dark auditorium with bright yellow lights lighting the stage",
      "title": "Hear It All",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Art",
      "img": "images/art.jpg",
      "img_alt": "A hand holding a paint brush hovering over several multi-colored paint pots",
      "title": "Emerging Artists",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Sport",
      "img": "images/sport.jpg",
      "img_alt": "A man surfing on a large wave",
      "title": "Benefits Of Sports",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }, {
      "tag": "Fashion",
      "img": "images/fashion.jpg",
      "img_alt": "The back of a person's head. The person is wearing a colorful baseball cap.",
      "title": "Summer Wear",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    }]
  },
  "hot_list": {
    "posts": [{
      "tag": "Nature",
      "title": "Lovely Landscapes Captured By Great Photographs",
      "img": "images/landscape.jpg",
      "img_alt": "A desert mountain landscape photographed from a great distance away",
      "description": "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad ipsum minim."
    }, {
      "tag": "Decoration",
      "title": "Inspiring Minimal Workspaces",
      "img": "images/workspace.jpg",
      "img_alt": "A dark wood desk with a laptop, camera, tablet, and phone spread around the center.",
      "description": "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad ipsum minim."
    }, {
      "tag": "Food",
      "title": "Outdoor Cuisine Made For The Open Flame",
      "img": "images/woodfire.jpg",
      "img_alt": "A pan sitting in a campfire cooking bright green vegetables and orange sausage",
      "description": "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad ipsum minim."
    }, {
      "tag": "Traveling",
      "title": "A Little House In The Country",
      "img": "images/vacation.jpg",
      "img_alt": "A cottage with a large reflecting pool in front of it. In the background is a canyon and mountainside.",
      "description": "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad ipsum minim."
    }]
  }
};

window.App = new App();
