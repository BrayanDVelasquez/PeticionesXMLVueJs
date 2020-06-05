const contenedorDeImg = Vue.component('contenedor-de-img', {
    template: /* html */ `
    <div class="imgs is-center">

        <div class="img">
            <div class="img-content">

                <div v-if="estado == 'no procesado'">
                    <img class="img-default" src="img/picture.png" >
                </div>
                
                <div v-if="estado == 'procesando'">
                    <spinner></spinner>
                </div>

                <div v-if="estado == 'error'">
                    <img class="img-error" src="img/error.png">
                </div>

                <div v-if="estado == 404">
                    <img class="img-error" src="img/404.png">
                </div>

                <div v-if="estado == 'procesado'">
                    <img :src="imgUrl">
                </div>

            </div> <!-- div.img-content -->
                
            <div class="img-divider">

                <div v-if="estado == 'procesando'">
                    <progress class="progress is-info" max="100" :value="imgComputable"></progress>
                </div>

                <div v-else>
                    <hr>
                </div>

            </div> <!-- div.img-divider -->

            <div class="img-footer">

                <div v-if="estado == 'no procesado'">
                    <button class="button is-info is-fullwidth" v-if="estado == 'no procesado'" @click="cargar">Cargar Imagen</button>
                </div>
                
                <div v-if="estado == 'procesando'">
                    <button class="button is-danger is-fullwidth" @click="cancelar">Cancelar</button>
                </div>

                <div v-if="estado == 'error'">
                    <button class="button is-danger is-fullwidth" v-if="estado == 'error'" @click="cargar">Reintentar</button>
                </div>

                <div v-if="estado == 404">
                    <div class="message is-danger">
                        <div class="message-body is-padding-8">
                            <p class="has-text-centered">Url no encontrada</p>
                        </div>
                    </div>
                </div>

                <div v-if="estado == 'procesado'">
                    <div class="message is-success">
                        <div class="message-body is-padding-8">
                            <p class="has-text-centered">Descargada con Exito</p>
                        </div>
                    </div>
                </div>

            </div> <!-- div.img-footer -->
        </div> <!-- div.img -->
    </div> <!-- div.imgs -->
    `,
    props: ['src'],
    data(){
        return {
            imgUrl: null,
            estado: 'no procesado',
            imgComputable: null,
            http: new XMLHttpRequest()
        }
    },
    methods: {
        
        cargar(){
            this.estado = 'procesando';
            this.peticion();
        },

        cancelar(){
            this.estado = 'no procesado';
            this.http.abort();
        },

        peticion(){
            this.http.open('GET', `img/${this.src}`);

                this.http.onreadystatechange = () => {
                    if(this.http.readyState == 4 && this.http.status == 200){

                        this.http.onload = () => {
                            this.imgUrl = `img/${this.src}`;
                            this.estado = 'procesado';
                        }

                        this.http.onerror = () => {
                            this.estado = 'error';
                        }
        
                    } 
                    
                    else if(this.http.readyState == 4 && this.http.status == 404) {
                        this.estado = 404;
                    }

                }

                this.http.addEventListener('progress', (evento) => {
                    if(evento.lengthComputable){
                        this.imgComputable = Math.round(evento.loaded / evento.total * 100);
                    }
                })
            
                this.http.send();

            }
        }
})

import spinner from './spinner.js';
export default contenedorDeImg;
