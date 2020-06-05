import contenedorDeImg from './components/contenedorDeImg.js';
import cabecera from './components/cabecera.js';

// Componente general
Vue.component('app', {
    template: /* html */ `
    <div>
        <cabecera></cabecera>

        <div class="container">
            <div class="columns is-12 is-mobile is-multiline">

                <div class="column is-6-tablet is-4-desktop is-12-mobile">
                    <contenedor-de-img src="1.jpg"></contenedor-de-img>
                </div>

                <div class="column is-6-tablet is-4-desktop is-12-mobile">
                    <contenedor-de-img src="2.jpg"></contenedor-de-img>
                </div>

                <div class="column is-6-tablet is-4-desktop is-12-mobile">
                    <contenedor-de-img src="3.jpg"></contenedor-de-img>
                </div>
                
            </div>
        </div>
    </div>
    `
})

new Vue({
    el: '#app',
});