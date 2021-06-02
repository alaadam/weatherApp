const input = $('input')
const renderer = new Render
const logic = new Logic()


$(document).ready(async function(){
    await loadPage()
})

$('#getCity').click(async function() {
    let city = input.val()
    await handleSearch(city)
});

$("body").on('click','.deleteButton', async function(){
    city =  $(this).data().name
    await logic.removeCity(city)
    renderer.renderData(logic.cityData)
});

$("body").on('click','.addButton', async function() {
    city = $(this).data().name
    await logic.saveCity(city)
    renderer.renderData(logic.cityData)
});

const loadPage = async function(){
    await logic.getDataFromDB()
    renderer.renderData(logic.cityData)
}

const handleSearch = async function(city){
    await logic.getCityData(city)
    renderer.renderData(logic.cityData)
}