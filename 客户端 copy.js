
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
      




      function submitForm() {   

      var datasetName = document.getElementById('id').value;
      var file = document.getElementById('file-upload').files[0];
      if (datasetName === '' || file === '') {
                return false; // 阻止表单提交
            }
      // 打开新页面
      // window.open('结果.html?id=' + datasetName + '&file=' + file, '_blank');

        if(globalVariable === 1){
          var formData = new FormData();
          var datasetName = document.getElementById('id').value;
          var file = document.getElementById('file-upload').files[0];
          var fileInput = document.getElementById('fileInput');
          var pyScipt = fileInput.files[0];
          formData.append("datasetName", datasetName);
          formData.append("file", file);
          formData.append("pyScipt", pyScipt);
          var xhr = new XMLHttpRequest();
          xhr.open("POST","http://113.54.239.199:8080/customed", true);
          xhr.onload = function () {
              if (xhr.status == 200) {
  
                  var response = JSON.parse(xhr.responseText);
                  if(response.code==='-2'){
                    alert('已有该ID，请重新输入');
                  }
                  else{
                    window.open('结果.html?id=' + datasetName + '&file=' + file, '_blank');
                  }
              } else {
                  alert("Failed to upload dataset: " + xhr.statusText);
              }
          };
          xhr.onerror = function () {
              alert("Failed to upload dataset");
          };
          xhr.send(formData);
      
        }else if(globalVariable === 2){
          var formData = new FormData();
          var datasetName = document.getElementById('id').value;
          var file = document.getElementById('file-upload').files[0];
          var firstDropdown = document.getElementById('firstDropdown');
          var secondDropdown = document.getElementById('secondDropdown');
      
          var selectedModel = firstDropdown.value;
          var selectedDevice = secondDropdown.value;
          formData.append("datasetName", datasetName);
          formData.append("file", file);
          formData.append("trainEnv", selectedModel);
          formData.append("trainNet", selectedDevice);
          var xhr = new XMLHttpRequest();
          xhr.open("POST","http://113.54.239.199:8080/model", true);
          xhr.onload = function () {
              if (xhr.status == 200) {
                
                  var response = JSON.parse(xhr.responseText);
                  if(response.code==='-2'){
                    alert('已有该ID，请重新输入');
                  }else{
                    window.open('结果.html?id=' + datasetName + '&file=' + file, '_blank');
                  }
              } else {
                  alert("Failed to upload dataset: " + xhr.statusText);
              }
          };
          xhr.onerror = function () {
              alert("Failed to upload dataset");
          };
          xhr.send(formData);
        }
        
   

      // var formData = new FormData();
      // formData.append("datasetName", datasetName);
      // formData.append("file", file);

      // var xhr = new XMLHttpRequest();
      // xhr.open("POST","http://113.54.248.192:8080/upload", true);
      // xhr.onload = function () {
      //     if (xhr.status == 200) {
      //         var response = JSON.parse(xhr.responseText);
      //         alert(response.message);
      //         if (response.accuracy) {
      //             alert("Accuracy: " + response.accuracy);
      //         }
      //     } else {
      //         alert("Failed to upload dataset: " + xhr.statusText);
      //     }
      // };
      // xhr.onerror = function () {
      //     alert("Failed to upload dataset");
      // };
      // xhr.send(formData);
  

    }   


    // 控制交替
    function switchBackgrounds() {
        const container = document.querySelector('.container');
        setInterval(() => {
          container.style.animation = 'none';
          container.offsetHeight; /* 强制刷新动画 */
          container.style.animation = 'backgroundAnimation 10s infinite'; /* 设置动画 */
        }, 5000); // 设置每张图片出现时间为5秒
      }
      
      switchBackgrounds();
      

      function updateFileName1(input) {
        var fileNameElement = document.getElementById('scriptname');
        if (input.files.length > 0) {
          fileNameElement.textContent = input.files[0].name;
        } else {
          fileNameElement.textContent = '';
        }
      }
      function updateFileName2(input) {
        var fileNameElement = document.getElementById('file-name');
        if (input.files.length > 0) {
          fileNameElement.textContent = input.files[0].name;
        } else {
          fileNameElement.textContent = '';
        }
      }
      let globalVariable = 0;
      function showUpload() {
        globalVariable = 1;
        document.getElementById('uploadSection').classList.remove('hidden');
        document.getElementById('dropdownSection').classList.add('hidden');
      }
  
      function showDropdowns() {
        globalVariable = 2;
        document.getElementById('uploadSection').classList.add('hidden');
        document.getElementById('dropdownSection').classList.remove('hidden');
      }
  
      function populateSecondDropdown() {
        const firstDropdownValue = document.getElementById('firstDropdown').value;
        const secondDropdown = document.getElementById('secondDropdown');
  
        if (firstDropdownValue === 'A') {
          secondDropdown.innerHTML = `<option value="A">A</option>`;
        } else if (firstDropdownValue === 'B') {
          secondDropdown.innerHTML = `<option value="B">B</option>`;
        } else if (firstDropdownValue === 'C') {
          // Populate second dropdown for option C if needed
        }
      }

      window.onload = function() {
        var goBackBtn = document.getElementById('goBackBtn');
    
        goBackBtn.addEventListener('click', function() {
            window.history.back(); // 返回上一页
        });
    }
     // 延时五秒后显示弹窗
        setTimeout(function() {
            document.getElementById('popup').style.display = 'block';
            // 延时五秒后隐藏弹窗
            setTimeout(function() {
                document.getElementById('popup').style.display = 'none';
            }, 10000); // 5000毫秒 = 5秒
        }, 7000); // 5000毫秒 = 5秒