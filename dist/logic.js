class Logic{
    constructor(){
        this.cityData = []
    }

    async getDataFromDB(){
        var self = this
        return $.get(`/cities`,function(resCity){
            console.log(resCity)
            resCity.forEach(city => { 
                self.cityData.push({...city,fromDB : true})
            });
        })
    }

    async getCityData(cityName){
        return $.get(`city/${cityName}`,(resCity)=>{
            this.cityData.push({...resCity,fromDB : false})
        })
    }
    
    async saveCity(cityName){
        return $.ajax({
            url: '/city',
            type: 'POST',
            data:{city : cityName},
            success:(resCity) => {
               for(let city in this.cityData){
                   if(this.cityData[city].name == cityName){
                        this.cityData[city].fromDB = true
                   }
               }
            }
        });
    }

    async removeCity(cityName){
        return $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            data:{city : cityName},
            success:(resCity) => {
                let cityIndex = this.cityData.findIndex(city => city.name == resCity.name)
                    console.log(cityIndex)
                    this.cityData.splice(cityIndex,1)
            }
        });
    }
}
