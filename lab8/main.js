

// lab 8.1

console.log('Lab 8.1: ');

// part 1

  // part 2

  function whereAmI(lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Too many requests. Try again later.');
          } else {
            throw new Error(`Problem with geocoding ${response.status}`);
          }
        }
        return response.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
      })
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => {
        console.log(data[0]);
      })
      .catch(err => console.error(`${err.message} 💥`));
  }
  
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

  // lab 8.2

  // part 1

  // 1

  function createImage(imgPath) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = imgPath;
  
      img.onload = () => {
        document.querySelector('.image').appendChild(img);
        resolve(img);
      };
  
      img.onerror = () => reject(new Error('Image not found'));
    });
  }

  
  // part 2

  // 2

  createImage('img1.jpg')
  .then(img => {
    console.log('Image 1 loaded');
    return wait(2,img);
  })
  .then((img) => {
    img.style.display = 'none';
    return createImage('img2.jpg');
  })
  .then(img => {
    console.log('Image 2 loaded');
    return wait(2,img);
  })
  .then((img) => {
    img.style.display = 'none';
  })
  .catch(err =>
     console.error("loi")
    );



  // 3 

  function wait(seconds,CurrentVar) {
    return new Promise(resolve => setTimeout(()=>{resolve(CurrentVar)}, seconds * 1000));
  }

  
  // lab 8.3

    // part 1

    // 1 

    async function loadNPause() {
        try {
          let img = await createImage('img2.jpg');
          console.log('Image 1 loaded');
          await wait(2);
          img.style.display = 'none';
      
          img = await createImage('img1.jpg');
          console.log('Image 2 loaded');
          await wait(2);
          img.style.display = 'none';
        } catch (err) {
          console.error(err);
        }
      }
    //   loadNPause();

      

      // part 2

      // 1

      async function loadAll(imgArr) {
        try {
          const imgs = imgArr.map(async img => await createImage(img));
          const imgEls = await Promise.all(imgs);
          imgEls.forEach(img => img.classList.add('parallel'));
        } catch (err) {
          console.error(err);
        }
      }
      loadAll(['img1.jpg', 'img2.jpg', 'img3.jpg']);
      