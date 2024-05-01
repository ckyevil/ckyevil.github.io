
let nextId = 1; // 下一个 ID 标识的数字

function addInputField() {
    var inputFields = document.getElementById('inputFields');
    var inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container'); 
    inputContainer.style.marginBottom = '20px';
    var label = document.createElement('span');
    label.classList.add('input-label');
    label.textContent = 'ID' + nextId + ':';
    var input = document.createElement('input');
    input.type = 'text';
    input.classList.add('custom-input'); // 添加自定义样式类名
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    inputFields.appendChild(inputContainer);
    nextId++;
}

function removeInputField() {
    var inputFields = document.getElementById('inputFields');
    if (inputFields.children.length > 0) {
        inputFields.removeChild(inputFields.lastChild);
        nextId--; // 每次移除输入框时，更新下一个 ID 标识的数字
    }
}

function submitForm() {
    var formData = new FormData();
    var firstDropdown = document.getElementById('firstDropdown');
    var secondDropdown = document.getElementById('secondDropdown');

    var selectedModel = firstDropdown.value;
    var selectedDevice = secondDropdown.value;
    formData.append("model", selectedModel);
    formData.append("algorithm", selectedDevice);

    var inputFields = document.getElementsByClassName('custom-input');
    var ids = [];
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value.trim() !== '') {
            ids.push(inputFields[i].value);
        }
    }
    var formattedIds = ids.join(',');
    formData.append("workerids", formattedIds);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://113.54.239.193:8080/flserver", true);
    xhr.send(formData);

    var submittedIds = JSON.parse(localStorage.getItem('submittedIds')) || [];

    // 将新提交的 IDs 以#分隔形成一个字符串
    var newSubmission = ids.join('#');

    // 将新提交的字符串添加到历史记录中
    submittedIds.push(newSubmission);

    // 保存更新后的历史记录到本地存储
    localStorage.setItem('submittedIds', JSON.stringify(submittedIds));

    window.location.href = '提交成功.html';
}

window.onload = function() {
    var goBackBtn = document.getElementById('goBackBtn');

    goBackBtn.addEventListener('click', function() {
        window.history.back(); // 返回上一页
    });
}
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