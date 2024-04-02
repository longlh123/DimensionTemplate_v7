document.addEventListener("DOMContentLoaded", function(event){
    
  document.getElementById("_Q0").value = "";
  let cur = new Date();
  document.getElementById("_Q1").value = cur;
  document.getElementById("_Q2").value = "";

  // Functions to open and close the modal
  function openModal() {
    document.getElementById('shelf-overlay').style.display = 'block';
    document.getElementById('shelf-modal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('shelf-overlay').style.display = 'none';
    document.getElementById('shelf-modal').style.display = 'none';
    document.getElementById('shopping-cart-modal').style.display = 'none';

    let txtAmount = document.getElementById("txtAmount");
    txtAmount.value = 0;
  }

  function selectdModal() {
    //--Modal Content--//
    let img = document.getElementById('shelf-image').querySelector("img");
    document.getElementById("_Q0").value = img.alt;

    let cur = new Date();
    document.getElementById("_Q2").value = cur;
    
    //--Modal Shopping Cart--//
    let txtTotalBurget = document.getElementById("txtTotalBurget");
    let txtAmount = document.getElementById("txtAmount");

    let total_burget = parseInt(txtTotalBurget.textContent.replace(/\D/g, "")) + txtAmount.value * parseInt(image_details[img.alt].price.replace(/\D/g, ""));

    image_details[img.alt].amount += txtAmount.value;

    txtTotalBurget.innerHTML = total_burget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.') + " VND";
    
    closeModal();
  }

  function verifiedModal(){
    let shoppingCartModal = document.getElementById('shopping-cart-modal');
    let shoppingCartWrapper = shoppingCartModal.querySelector(".shopping-cart-wrapper");

    let products = shoppingCartWrapper.querySelectorAll("input[type=number]");
    let total_burget = 0;

    products.forEach(product => {
      image_details[product.id.replace("txtAmount", "")].amount = product.value;

      total_burget += product.value * parseInt(image_details[product.id.replace("txtAmount", "")].price.replace(/\D/g, "")); 
    });

    txtTotalBurget.innerHTML = total_burget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.') + " VND";

    closeModal();
  }

  function openShoppingCartModal() {
    let shoppingCartModal = document.getElementById('shopping-cart-modal');
    
    document.getElementById('shelf-overlay').style.display = 'block';
    shoppingCartModal.style.display = 'flex';

    shoppingCartWrapper = shoppingCartModal.querySelector(".shopping-cart-wrapper");
    shoppingCartWrapper.innerHTML = "";

    for(const[key, image] of Object.entries(images)){
      if(image.alt != "image_shelf"){
        if(image_details[image.alt].amount > 0){
          shoppingCartWrapper.appendChild(objHTML.template(
            "<div class='product'><img src='" + image.src + "' alt='" + image_details[image.alt].name + "'/><div class='product-info'><div class='product-name'>" + image_details[image.alt].name + "</div><div class='product-amount'><label for='txtAmount" + image.alt + "'>Số lượng:</label><input type='number' id='txtAmount" + image.alt + "' value='" + image_details[image.alt].amount + "' min='0' max='100' /></div></div></div>"
          ));
        }
      }
    };
  }

  // Close the modal if the overlay is clicked
  document.getElementById('shelf-overlay').addEventListener('click', closeModal);

  document.getElementById('btnSelected').addEventListener('click', (event) => {
    selectdModal();
    event.defaultPrevented;        
  });

  document.getElementById('btnClose1').addEventListener('click', (event) => {
    closeModal();
    event.defaultPrevented;
  });

  document.getElementById('btnTotalBurget').addEventListener('click', (event) => {
    openShoppingCartModal();
    event.defaultPrevented;        
  });

  document.getElementById('btnVerified').addEventListener('click', (event) => {
    verifiedModal();
    event.defaultPrevented;        
  });

  document.getElementById('btnClose2').addEventListener('click', (event) => {
    closeModal();
    event.defaultPrevented;
  });

  const canvas = document.getElementById('shelfCanvas');
  const ctx = canvas.getContext('2d');
    
  // Initial zoom level
  let zoomLevel = 1;
    
  // Offset for image position during drag
  let isDragging = false;
  let isClicking = false;

  let imageOffsetX = 0; 
  let imageOffsetY = 0;

  // Define an array to store image objects and their properties
  const images = {}
  const image_details = {
    'image_1' : { name: 'Betadine Gentle Protection', volume: '100ml', price: '100.000', amount: 0 },
    'image_2' : { name: 'Betadine Gentle Protection', volume: '250ml', price: '50.000', amount: 0 },
    'image_3' : { name: 'Dạ hương dưỡng ẩm', volume: '120ml', price: '99.000', amount: 0 },
    'image_4' : { name: 'Dạ hương xanh', volume: '120ml', price: '59.999', amount: 0 },
    'image_5' : { name: 'Femfresh Daily Intimate Wash', volume: '250ml', price: '99.999', amount: 0 },
    'image_6' : { name: 'Femfresh Soothing Wash', volume: '250ml', price: '250.000', amount: 0 },
    'image_7' : { name: 'Lactacyd Odor Fresh', volume: '250ml', price: '599.000', amount: 0 },
    'image_8' : { name: 'Lactacyd Pro Sensitive', volume: '150ml', price: '69.999', amount: 0 },
    'image_9' : { name: 'Lactacyd Pro Sensitive', volume: '250ml', price: '70.000', amount: 0 },
    'image_10' : { name: 'Lactacyd Soft & Sliky', volume: '150ml', price: '150.000', amount: 0 },
    'image_11' : { name: 'Lactacyd Soft & Sliky', volume: '250ml', price: '45.999', amount: 0 },
    'image_12' : { name: 'Ladycare thảo mộc', volume: '100ml', price: '100.000', amount: 0 },
    'image_13' : { name: 'Saforelle chiết xuất lô hội', volume: '100ml', price: '120.000', amount: 0 },
    'image_14' : { name: 'Saforelle Intensive Moisturizing Cleansing Care', volume: '100ml', price: '350.000', amount: 0 },
    'image_15' : { name: 'Saforelle Intensive Moisturizing Cleansing Care', volume: '250ml', price: '299.000', amount: 0 },
    'image_15' : { name: 'Betadine Gentle Protection', volume: '100ml', price: '100.000', amount: 0 },
    'image_16' : { name: 'Betadine Gentle Protection', volume: '250ml', price: '50.000', amount: 0 },
    'image_17' : { name: 'Dạ hương dưỡng ẩm', volume: '120ml', price: '99.000', amount: 0 },
    'image_18' : { name: 'Dạ hương xanh', volume: '120ml', price: '59.999', amount: 0 },
    'image_19' : { name: 'Femfresh Daily Intimate Wash', volume: '250ml', price: '99.999', amount: 0 },
    'image_20' : { name: 'Femfresh Soothing Wash', volume: '250ml', price: '250.000', amount: 0 },
    'image_21' : { name: 'Lactacyd Odor Fresh', volume: '250ml', price: '599.000', amount: 0 },
    'image_22' : { name: 'Lactacyd Pro Sensitive', volume: '150ml', price: '69.999', amount: 0 },
    'image_23' : { name: 'Lactacyd Pro Sensitive', volume: '250ml', price: '70.000', amount: 0 },
    'image_24' : { name: 'Lactacyd Soft & Sliky', volume: '150ml', price: '150.000', amount: 0 },
    'image_25' : { name: 'Lactacyd Soft & Sliky', volume: '250ml', price: '45.999', amount: 0 },
    'image_26' : { name: 'Ladycare thảo mộc', volume: '100ml', price: '100.000', amount: 0 },
    'image_27' : { name: 'Saforelle Intensive Moisturizing Cleansing Care', volume: '250ml', price: '299.000', amount: 0 },
    'image_28' : { name: 'Lactacyd Pro Sensitive', volume: '150ml', price: '69.999', amount: 0 },
    'image_29' : { name: 'Lactacyd Pro Sensitive', volume: '250ml', price: '70.000', amount: 0 },
    'image_30' : { name: 'Lactacyd Soft & Sliky', volume: '150ml', price: '150.000', amount: 0 },
    'image_31' : { name: 'Betadine Gentle Protection', volume: '100ml', price: '100.000', amount: 0 },
    'image_32' : { name: 'Betadine Gentle Protection', volume: '250ml', price: '50.000', amount: 0 },
    'image_33' : { name: 'Dạ hương dưỡng ẩm', volume: '120ml', price: '99.000', amount: 0 },
    'image_34' : { name: 'Dạ hương xanh', volume: '120ml', price: '59.999', amount: 0 },
    'image_35' : { name: 'Femfresh Daily Intimate Wash', volume: '250ml', price: '99.999', amount: 0 },
    'image_36' : { name: 'Femfresh Soothing Wash', volume: '250ml', price: '250.000', amount: 0 }
  }

  let floor = 1;

  for(let i = 0; i <= 36; i++){
    if(i == 0){
      images['image_shelf'] = { src: 'https://images1.ipsosinteractive.com/ABC_VIETNAM_10072020/images/shelf_template_test/shelf_4.png', alt: 'image_shelf', floor: floor, x: 0, y: 0, width: 0, height: 0 };
    } else {
      images['image_' + i] = { src: 'https://images1.ipsosinteractive.com/ABC_VIETNAM_10072020/images/shelf_template_test/image_' + i + '.png', alt: 'image_' + i, floor: floor, x: 0, y: 0, width: 0, height: 0 };

      if(i == 9 || i == 18 || i == 27){
        floor += 1;
      }
    }
  }

  function loadImage(image) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;

          img.src = image.src;
          img.alt = image.alt;
      });
  }
    
  //Function to draw rectangle with text
  function drawRectWithText(x, y, width, height, text) {
    // Draw rectangle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, width, height);

    // Draw text
    ctx.fillStyle = '#000';
    ctx.font = (8 * zoomLevel) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + width / 2, y + height / 2);
  }
    
  const img_shelf = new Image();
    
  async function drawImages() {
    try{
      const loadedImages = await Promise.all(Object.values(images).map(loadImage));

      let dx = 0;
      let dy = 0;
      let dwidth = 0;
      let dheight = 0;

      let ratio = 0.135
      let count = 0;
      
      let top_left_corner = { dx: 0, dy: 0 };
      top_left_corner.dx = images['image_shelf'].x + 110;
      top_left_corner.dy = images['image_shelf'].y + 95;

      loadedImages.forEach(image => {
        if(image.alt == 'image_shelf'){
          dx = images['image_shelf'].x * zoomLevel;
          dy = images['image_shelf'].y * zoomLevel;
          dwidth = image.width * zoomLevel;
          dheight = image.height * zoomLevel;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
          ctx.drawImage(image, dx, dy, dwidth, dheight);

          images[image.alt].width = image.width;
          images[image.alt].height = image.height;
        } else {
          image.width = 287 * ratio
          image.height = 660 * ratio

          let x_step = 0, y_step = 0;
          let opacity = 0.6;
          let ratio_rect = 1;

          for(let i = 1; i <= 3; i++){
            dx = imageOffsetX + (top_left_corner.dx - x_step) * zoomLevel;
            dy = imageOffsetY + (top_left_corner.dy + (images[image.alt].floor == 1 ? 12 : y_step)) * zoomLevel;
            dwidth = image.width * zoomLevel;
            dheight = image.height * zoomLevel;
            
            ctx.globalAlpha = opacity;
            ctx.drawImage(image, dx, dy, dwidth, dheight);

            if(i == 3){
              images[image.alt].x = top_left_corner.dx;
              images[image.alt].y = top_left_corner.dy;
              images[image.alt].width = image.width;
              images[image.alt].height = image.height;

              let rect_dx = imageOffsetX + (top_left_corner.dx - 5) * zoomLevel
              let rect_dy = imageOffsetY + (top_left_corner.dy + 14 + image.height) * zoomLevel
              let rect_dwidth = 30 * zoomLevel
              let rect_dheight = 10 * zoomLevel

              drawRectWithText(rect_dx, rect_dy, rect_dwidth, rect_dheight, image_details[image.alt].price);
            }

            opacity += 0.2
            ratio_rect += 0.2
            x_step += 5
            y_step += 7
          }
          
          top_left_corner.dx = top_left_corner.dx + image.width + 5
          count++;
          
          if(count == 9){
            top_left_corner.dx = images['image_shelf'].x + 115;
            top_left_corner.dy += 133;
          }
          if(count == 18){
            top_left_corner.dx = images['image_shelf'].x + 115;
            top_left_corner.dy += 136;
          }
          if(count == 27){
            top_left_corner.dx = images['image_shelf'].x + 115;
            top_left_corner.dy += 140;
          }
        }
        
      });
    }catch(error){
      console.error("Error loading image:", error);
    }
  }
  function attachClickListener() {
      canvas.addEventListener('click', handleClick, false);
      canvas.addEventListener('mousedown', handleMouseDown, false);
      canvas.addEventListener('mouseup', handleMouseUp, false);
      canvas.addEventListener('mouseout', handleMouseOut, false);
      canvas.addEventListener('mousemove', handleMouseMove, false);
  }

  function handleClick(event) {
      if (isDragging) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      if(!isClicking) return;

      for(const [key, image] of Object.entries(images)){

        if(key != 'image_shelf'){
          if (x >= imageOffsetX + image.x * zoomLevel && x <= imageOffsetX + (image.x + image.width) * zoomLevel &&
            y >= imageOffsetY + image.y * zoomLevel && y <= imageOffsetY + (image.y + image.height) * zoomLevel) {
              console.log("Image", image.src, "Clicked!");
              // You can add specific actions for each image here based on the index (i)
              
              openModal();
              
              document.getElementById('shelf-image').innerHTML = ("<img src='" + image.src + "' alt='" + image.alt + "'/>");
              document.getElementById('shelf-info-name').innerHTML = image_details[key].name
              document.getElementById('shelf-info-volume').innerHTML = "Dung tích: " + image_details[key].volume
              document.getElementById('shelf-info-price').innerHTML = "Giá: " + image_details[key].price
              break; // Exit loop after finding the clicked image
          }
        }
      }
  }

  let startX = null;
  let startY = null;

  function is_mouse_in_shape(x, y, shape){
    let shape_left = shape.x;
    let shape_right = shape.x + shape.width * zoomLevel;
    let shape_top = shape.y;
    let shape_bottom = shape.y + shape.height * zoomLevel;

    if(x > shape_left && x < shape_right && y > shape_top && y < shape_bottom){
      return true;
    }

    return false;
  }

  function handleMouseDown(event){
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();

    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
    
    if(is_mouse_in_shape(startX, startY, images['image_shelf'])){
      //console.log("yes");
      isDragging = true;
    } else {
      //console.log("no");
    }
  }

  function handleMouseUp(event){
    if(!isDragging){
      return;
    }

    event.preventDefault();
    isDragging = false;

    if(images['image_shelf'].x < 0){
      let chieu_rong_con_lai = images['image_shelf'].width * zoomLevel + images['image_shelf'].x;
    
      if(chieu_rong_con_lai < canvas.width){
        images['image_shelf'].x = images['image_shelf'].x + (canvas.width - chieu_rong_con_lai)  * zoomLevel;
      }
    } else{
      images['image_shelf'].x = 0;
    }

    if(images['image_shelf'].y < 0){
      let chieu_cao_con_lai = images['image_shelf'].height * zoomLevel + images['image_shelf'].y;
    
      if(chieu_cao_con_lai < canvas.height){
        images['image_shelf'].y = images['image_shelf'].y + (canvas.height - chieu_cao_con_lai)  * zoomLevel;
      }
    } else{
      images['image_shelf'].y = 0;
    }

    drawImages();
  }

  function handleMouseOut(event){
    if(!isDragging){
      return;
    }

    event.preventDefault();
    isDragging = false;

    if(images['image_shelf'].x < 0){
      let chieu_rong_con_lai = images['image_shelf'].width * zoomLevel + images['image_shelf'].x;
    
      if(chieu_rong_con_lai < canvas.width){
        images['image_shelf'].x = images['image_shelf'].x + (canvas.width - chieu_rong_con_lai)  * zoomLevel;
      }
    } else{
      images['image_shelf'].x = 0;
    }

    if(images['image_shelf'].y < 0){
      let chieu_cao_con_lai = images['image_shelf'].height * zoomLevel + images['image_shelf'].y;
    
      if(chieu_cao_con_lai < canvas.height){
        images['image_shelf'].y = images['image_shelf'].y + (canvas.height - chieu_cao_con_lai)  * zoomLevel;
      }
    } else{
      images['image_shelf'].y = 0;
    }

    drawImages();
  }

  function handleMouseMove(event){
    
    if(!isDragging){
      isClicking = true;
      return;
    } else {
      isClicking = false;
      
      event.preventDefault();

      const rect = canvas.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      
      imageOffsetX = mouseX - startX;
      imageOffsetY = mouseY - startY;

      imageOffsetX = imageOffsetX + (imageOffsetX * (1 - zoomLevel));
      imageOffsetY = imageOffsetY + (imageOffsetY * (1 - zoomLevel));

      images['image_shelf'].x += imageOffsetX;
      images['image_shelf'].y += imageOffsetY;

      drawImages();
      
      startX = mouseX;
      startY = mouseY;
    }
  }
  
  function zoomIn() {
      zoomLevel *= 1.2; // Increase zoom level by 20%
      drawImages();
  }

  function zoomOut() {
      if (zoomLevel > 1) {
          zoomLevel /= 1.2; // Decrease zoom level by 20%
          drawImages();
      }
  }

  const zoomInButton = document.getElementById('zoomIn');
  const zoomOutButton = document.getElementById('zoomOut');

  zoomInButton.addEventListener('click', zoomIn);
  zoomOutButton.addEventListener('click', zoomOut);

  drawImages().then(attachClickListener);
});
