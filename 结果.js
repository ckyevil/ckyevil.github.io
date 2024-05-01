 // 获取URL中的参数值
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 获取datasetName参数值
var datasetName = getParameterByName('id');
console.log(datasetName);
loading1.style.display = 'block'; // 显示加载动画
loading2.style.display = 'block'; // 显示加载动画
 // 定义一个函数，用于向后端发送 GET 请求并展示数据
function fetchDataFromBackend() {
    // 发送 GET 请求到后端的 URL
    fetch('http://113.54.246.250:8080/getAccuracy?datasetName='+datasetName)
        .then(response => {
            // 如果请求成功，返回响应的数据
            if (response.ok) {
                return response.json(); // 返回响应的文本数据
            }
            // 如果请求失败，抛出一个错误
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            loading1.style.display = 'none'; // 隐藏加载动画
            loading2.style.display = 'none'; // 隐藏加载动画
            const stringValue1 = data.accuracy; // 获取 JSON 数据中的第一个字符串
            const stringValue2 = data.url; // 获取 JSON 数据中的第二个字符串
            console.log(stringValue2);
            const image = document.getElementById('image');
            image.src = stringValue2;

    // 提取浮点数
    // const floatValue = data* 100;
    // document.body.style.background = 'url("../picture/1.PNG")';

  
        // document.body.style.background = 'url("../picture/加载完成.PNG")'; // 背景图片的路径替换为实际图片路径
        // 在页面上展示浮点数
        // document.body.style.backgroundSize = 'cover';
        // document.body.style.animation = 'none';
        document.getElementById('result').innerText = stringValue1 + '%';
          
        })
        .catch(error => {
            // 处理错误情况
            loading1.style.display = 'none'; // 隐藏加载动画
            loading2.style.display = 'none'; // 隐藏加载动画
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('result').innerText = error.message;
        });
}

// 页面加载完成后立即执行 fetchDataFromBackend 函数
window.onload = fetchDataFromBackend;


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


//图片选择框
const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');

    fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block'; // Ensure the image preview is visible
        };
        reader.readAsDataURL(file);
      }
    });

  //submit按钮
    // const sendBtn = document.getElementById('sendBtn');
    // const outputDiv = document.getElementById('output');
    function submitForm(){
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0]; // 获取选择的文件对象
        var formData = new FormData();
      formData.append("file", file);
      formData.append("datasetName", datasetName);
      loading3.style.display = 'block'; // 显示加载动画
      var xhr = new XMLHttpRequest();
      xhr.open("POST","http://113.54.246.250:8080/predict", true);
      xhr.onload = function () {
        loading3.style.display = 'none'; // 隐藏加载动画
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);

              if (response.code=='1') {
                document.getElementById('message').textContent = response.msg;
            } else {
                alert("Failed to upload dataset: " + xhr.statusText);
              }
          } else {
              alert("Failed to upload dataset: " + xhr.statusText);
          }
      };
      xhr.onerror = function () {
        loading3.style.display = 'none'; // 隐藏加载动画
          alert("Failed to upload dataset");
      };
      xhr.send(formData);
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