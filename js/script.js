const toggleSpinner = (param) =>{
    document.getElementById('sp').style.display = param;
    // console.log('fadsfasdf')
}
const toggleError = (param) =>{
    document.getElementById('error-massage').style.display = param;
    // console.log('fdf')
}
const searchField=()=>{
    document.getElementById('result-field').textContent = '';
    document.getElementById('details-field').textContent = '';
}

const searchBtn = () =>{
    toggleSpinner('block')
    searchField()
    const searchText = document.getElementById('input-field').value;
    if(!searchText){
        // document.getElementById('error-massage').style.display = 'block'
        toggleError('block')
        toggleSpinner('none')
    }
    else{
        toggleError('none')
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
    }  
}




const displayPhones = (phones) => {
    // console.log(phones)
    if(phones.length === 0){
        console.log('not founded')
        toggleError('block')
        toggleSpinner('none')
    }
    else{
        const twenty = phones.slice(0,20)
    // console.log(twenty)
    const resultFieldContainer = document.getElementById('result-field')
    resultFieldContainer.textContent = ''
    twenty.forEach(phone => {
        // console.log(phone.image)
        const div = document.createElement('div')
        div.classList.add('col')
        div.classList.add('col-lg-4')
        div.classList.add('col-sm-12')
        div.innerHTML = `
            <div class="card mb-4 p-4">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.phone_name}</h3>
                <h5 class="card-title">${phone.brand}</h5>
                <button type="button" class="btn btn-primary" onclick="getPhoneId('${phone.slug}')">Show Details</button>
            </div>
            </div>
        `;
        resultFieldContainer.appendChild(div)
    })
    toggleSpinner('none')
    }
}

const getPhoneId = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails =(phone) =>{
    console.log(phone.others)
    
    document.getElementById('details-field').innerHTML= `
    <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${phone.image}" class="w-75 img-fluid rounded-start my-4 mx-auto d-block" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h2 class="card-title">${phone.name}</h2>
                      <h6 class="card-title text-muted">${phone.releaseDate ? phone.releaseDate: 'Release Date Not Found'}</h6>
                      <h3 class="card-title text-muted">Main Features:</h3>
                      <p class="">Chipset: ${phone.mainFeatures.chipSet}</p>
                      <p class="">Display Size: ${phone.mainFeatures.displaySize}</p>
                      <p class="">Memory: ${phone.mainFeatures.memory}</p>
                      <p class="">Storage: ${phone.mainFeatures.storage}</p>
                      <p class=""><small class="text-muted">Last updated 3 mins ago</small></p>
                    <div class="row">
                        <div class="col-lg-6">
                            <h3 class="text-muted">Other Features:</h3>
                            <p>Bluetooth: ${phone?.others?.Bluetooth ? phone?.others?.Bluetooth: 'No result found'} </p>
                            <p>GPS: ${phone?.others?.GPS ? phone?.others?.GPS: 'No Result Found'}</p>
                            <p>NFC: ${phone?.others?.NFC ? phone?.others?.NFC: 'No Result Found'} </p>
                            <p>Radio: ${phone?.others?.Radio ? phone?.others?.Radio: 'No Result Found'}</p>
                            <p>USB: ${phone?.others?.USB ? phone?.others?.USB: 'No Result Found'}</p>
                            <p>WLAN: ${phone?.others?.WLAN ? phone?.others?.WLAN: 'No Result Found'}</p>
                        </div>
                        <div id="sensors" class="col-lg-6"> 
                            <h3 class="card-title text-muted">Sensors:</h3>
                        </div>
                    </div>

                    </div>
                  </div>
                </div>
              </div>
    `;
    getSensorData(phone.mainFeatures.sensors)
}

const getSensorData=(sensors)=>{
    const sensorContainer = document.getElementById('sensors');
    sensors.forEach(sensor =>{
        console.log(sensor)
        const p = document.createElement('p')
        p.innerText=sensor;
        sensorContainer.appendChild(p)
    })
}