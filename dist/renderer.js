class Render{
    constructor(){
    this.containerElement=$('#city');
    this.source=$("#city-template").html();
    this.template=Handlebars.compile(this.source)
    }
    
    renderData(cities){
        this.containerElement.html('');
        const newHTML=this.template({mycities : cities});
        this.containerElement.append(newHTML);
    }    
}
    