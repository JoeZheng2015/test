window.onload = function() {
   // var block1 = document.getElementById('block1');
   var blocks = document.getElementsByName('block');
   var box1 = document.getElementById('box1');
   var box2 = document.getElementById('box2');

   for (var i = 0, l = blocks.length; i < l; i++) {
       blocks[i].ondragstart = function (e) {
           e.dataTransfer.setData('text', e.target.id);
       }
   }
   box1.ondrop = function (e) {
       var data = e.dataTransfer.getData('text');
       e.target.appendChild(document.getElementById(data));
       e.preventDefault();
   }
   box1.ondragover = function (e) {
       e.preventDefault();
   }
   box2.ondrop = function (e) {
       var data = e.dataTransfer.getData('Text');
       e.target.appendChild(document.getElementById(data));
       e.preventDefault();
   }
   box2.ondragover = function (e) {
       e.preventDefault();
   } 
};