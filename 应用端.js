window.onload = function() {
    var submittedIds = JSON.parse(localStorage.getItem('submittedIds')) || [];


// 添加预设的历史记录
var presetHistories = ["BOB#ECOL#FABI", "ALICE#BOB#CANDY"]; // 预设的历史记录数组

presetHistories.forEach(function(preset) {
    submittedIds.push(preset); // 将预设历史记录添加到数组中
});

localStorage.setItem('submittedIds', JSON.stringify(submittedIds)); // 更新localStorage中的数据


    var dynamicDropdown = document.getElementById('dynamicDropdown');
    submittedIds.forEach(function(submission) {
        var option = document.createElement('option');
        var ids = submission.split('#');
        var text = ids.join(', '); // 用逗号分隔每个ID
        option.text = text;
        dynamicDropdown.add(option);
    });
    var initialSelection = submittedIds.length > 0 ? submittedIds[0] : ''; // 获取历史记录中的第一条数据
    var initialIds = initialSelection.split('#'); // 使用井号#拆分ID
    newDropdown.innerHTML = '';

    // 将拆分后的ID分别添加为新下拉框的选项
    initialIds.forEach(function(id) {
        var newOption = document.createElement('option');
        newOption.text = id.trim(); // 去除空格
        newDropdown.add(newOption);
    });
    dynamicDropdown.addEventListener('change', function() {
        newDropdown.innerHTML = ''; // 清空新下拉框的选项

        dynamicDropdown.selectedOptions[0].text.split(', ').forEach(function(id) {
            var newOption = document.createElement('option');
            newOption.text = id.trim();
            newDropdown.add(newOption);
        });
    });

    submitButton.addEventListener('click', function() {
        var dynamicDropdownSelected = dynamicDropdown.value;
        var newDropdownSelected = newDropdown.value;
        
        // 在这里可以处理提交操作，比如将选中的内容发送到服务器或进行其他操作
        console.log("已选中的动态下拉框内容：" + dynamicDropdownSelected);
        console.log("已选中的新下拉框内容：" + newDropdownSelected);
    });

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
  var submitImageBtn = document.getElementById('submitImageBtn');

  submitImageBtn.addEventListener('click', function() {
      var file = fileInput.files[0];
      if (file) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
              var imageSrc = e.target.result;
              // 在这里可以处理提交操作，比如将图片数据发送到服务器或进行其他操作
              console.log("已选中的图片：" + imageSrc);
          };
      } else {
          console.log("请先选择一张图片");
      }
  });

}


window.onload = function() {
    var goBackBtn = document.getElementById('goBackBtn');

    goBackBtn.addEventListener('click', function() {
        window.history.back(); // 返回上一页
    });
}


// window.addEventListener('beforeunload', function(event) {

//     localStorage.removeItem('submittedIds');
// });
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

  function submitForm(){
    var formData = new FormData();
    var dynamicDropdown = document.getElementById('dynamicDropdown');
    var newDropdown = document.getElementById('newDropdown');

    var history = dynamicDropdown.value;
    var id = newDropdown.value;
    formData.append("workerid", id);
    formData.append("model", history);
    loading.style.display = 'block'; // 显示加载动画
    var xhr = new XMLHttpRequest();
      xhr.open("POST","http://113.54.246.250:8080/testFL", true);
      xhr.onload = function () {
        loading.style.display = 'none'; // 隐藏加载动画
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.code==='1') {
              document.getElementById('msg').textContent = response.result;
              console.log(response.result);
          } else {
              alert("Failed to upload dataset: " + xhr.statusText);
            }
        } else {
            alert("Failed to upload dataset: " + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        loading.style.display = 'none'; // 隐藏加载动画
        alert("Failed to upload dataset");
    };
      xhr.send(formData);
  }

  function submitForm1(){
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // 获取选择的文件对象
    var dynamicDropdown = document.getElementById('dynamicDropdown');
    var history = dynamicDropdown.value;
    var formData = new FormData();
    formData.append("file", file);
    formData.append("model", history);
    loading1.style.display = 'block'; // 显示加载动画
    var xhr = new XMLHttpRequest();
      xhr.open("POST","http://113.54.246.250:8080/applyPredict", true);
      xhr.onload = function () {
        loading1.style.display = 'none'; // 隐藏加载动画
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response.result);
            if (response.code==='1') {
                
              document.getElementById('result').textContent = response.result;
              console.log(response.result);
          } else {
              alert("Failed to upload dataset: " + xhr.statusText);
            }
        } else {
            alert("Failed to upload dataset: " + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        loading1.style.display = 'none'; // 隐藏加载动画
        alert("Failed to upload dataset");
    };
      xhr.send(formData);
  }