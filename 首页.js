class IntersectionObserverList {
	mapping;
	observer;
	constructor() {
		this.mapping = new Map();
		this.observer = new IntersectionObserver(
			(entries) => {
				for (var entry of entries) {
					var callback = this.mapping.get(entry.target);

					callback && callback(entry.isIntersecting);
				}
			},
			{
				rootMargin: "0px 0px 0px 0px"
			}
		);
	}
	add(element, callback) {
		this.mapping.set(element, callback);
		this.observer.observe(element);
	}
	ngOnDestroy() {
		this.mapping.clear();
		this.observer.disconnect();
	}
	remove(element) {
		this.mapping.delete(element);
		this.observer.unobserve(element);
	}
}
const observer = new IntersectionObserverList();



// 给整个页面添加默认的鼠标样式
$('body').css('cursor', 'default');





(function fairyDustCursor() {

	var possibleColors = ["#007bff", "#ffffff"];
	  var width = window.innerWidth;
	  var height = window.innerHeight;
	  var cursor = { x: width / 2, y: width / 2 };
	  var particles = [];

	  function init() {
		  bindEvents();
		  loop();
	  }

	 
	  function bindEvents() {
		  document.addEventListener('mousemove', onMouseMove);
		  window.addEventListener('resize', onWindowResize);
	  }

	  function onWindowResize(e) {
		  width = window.innerWidth;
		  height = window.innerHeight;
	  }

	  function onMouseMove(e) {
		  cursor.x = e.clientX;
		  cursor.y = e.clientY;

		  addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
	  }

	  function addParticle(x, y, color) {
		  var particle = new Particle();
		  particle.init(x, y, color);
		  particles.push(particle);
	  }

	  function updateParticles() {

		  
		  for (var i = 0; i < particles.length; i++) {
			  particles[i].update();
		  }

		 
		  for (var i = particles.length - 1; i >= 0; i--) {
			  if (particles[i].lifeSpan < 0) {
				  particles[i].die();
				  particles.splice(i, 1);
			  }
		  }

	  }

	  function loop() {
		  requestAnimationFrame(loop);
		  updateParticles();
	  }

	

	  function Particle() {

		  this.character = "*";
		  this.lifeSpan = 120; //ms
		  this.initialStyles = {
			  "position": "fixed",
			  "display": "inline-block",
			  "top": "0px",
			  "left": "0px",
			  "pointerEvents": "none",
			  "touch-action": "none",
			  "z-index": "10000000",
			  "fontSize": "25px",
			  "will-change": "transform"
		  };

		
		  this.init = function (x, y, color) {

			  this.velocity = {
				  x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
				  y: 1
			  };

			  this.position = { x: x + 10, y: y + 10 };
			  this.initialStyles.color = color;

			  this.element = document.createElement('span');
			  this.element.innerHTML = this.character;
			  applyProperties(this.element, this.initialStyles);
			  this.update();

			  document.querySelector('.js-cursor-container').appendChild(this.element);
		  };

		  this.update = function () {
			  this.position.x += this.velocity.x;
			  this.position.y += this.velocity.y;
			  this.lifeSpan--;

			  this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
		  }

		  this.die = function () {
			  this.element.parentNode.removeChild(this.element);
		  }

	  }

	 
	  function applyProperties(target, properties) {
		  for (var key in properties) {
			  target.style[key] = properties[key];
		  }
	  }

	  if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
  })();   
  
  document.getElementById("Client").addEventListener("click", function() {
    window.location.href = "客户端.html"; // 在这里填写你要跳转的网页地址
});

document.getElementById("Server").addEventListener("click", function() {
    window.location.href = "服务端copy.html"; // 在这里填写你要跳转的网页地址
});

document.getElementById("Apply").addEventListener("click", function() {
    window.location.href = "应用端.html"; // 在这里填写你要跳转的网页地址
});
